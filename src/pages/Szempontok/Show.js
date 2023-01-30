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

	const adatokLekerese = async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/szempont/'+index, {
				headers: { 
					'Content-type': 'application/vnd.api+json',
					'Accept': 'application/vnd.api+json',
					'Authorization': `Bearer ${token}` 
				}
			});
			setData(res.data.data);
		} catch (error) {
        //console.log(error);
        alert(error.response.data.message)
		}
	};
	useEffect(() => {adatokLekerese()}, []);

	const vissza = () => { navigate(-1)}
    
  return (
    <div>
        <h1>A szempont részletei</h1>
		<p>{data.id}</p>
        <p>{data.szempontsor_megnevezes}</p>
		<p>{data.terulet}</p>
		<p>{data.szempont}</p>
		<p>{data.magyarazat}</p>
		<p>{data.kiegeszites}</p>
		<p>{data.kapcsolodo}</p>
		<p>{data.adatforras}</p>
		<p>{data.ertek}</p>
		<p>{data.sulyszorzo}</p>
		<p>{data.sulyozott}</p>
	
		<p>{data.created_at}</p>
		<p>{data.updated_at}</p>
		
		<Button variant='info' onClick={vissza}>Vissza</Button>
    </div>
  )
}
export default Show