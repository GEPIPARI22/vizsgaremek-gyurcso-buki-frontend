import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function Show() {
    let { index } = useParams();
	const navigate = useNavigate();
    const [data, setData] = useState({});

	const token = localStorage.getItem("token")

	const nowDate = new Date()
	const HuFormatter = new Intl.DateTimeFormat('hu-Hu')
	const datum = HuFormatter.format(nowDate)

	const adatokLekerese = async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/iskola/'+index, {
				headers: { 
					'Content-type': 'application/vnd.api+json',
					'Accept': 'application/vnd.api+json',
					'Authorization': `Bearer ${token}` 
				}
			});
			setData(res.data.data);
		} catch (error) {
        //console.log(error);
        alert(error.response.data.message)		}
	};
	useEffect(() => {adatokLekerese()}, []);

	const navBlogs = () => { navigate('../iskolak')}
    
  return (
    <div>
        <h1>Az iskola adatai</h1><br />
		<p><b>Id: </b>{data.id}</p>
        <p><b>Iskola neve:</b> {data.nev}</p>
		<p><b>Cím:</b> {data.iranyitoszam} {data.varos} {data.utca}</p>
		<p><b>Telefon:</b> {data.telefon}</p>
		<p><b>E-mail:</b> {data.email}</p>
		<p><b>Bejegyzés dátuma:</b> {data.created_at}</p>
		<p><b>Módosítva:</b> {data.updated_at}</p>
		<p>{datum}</p><br></br>
		<Button variant='info' onClick={navBlogs}>Vissza</Button>
    </div>
  )
}
export default Show