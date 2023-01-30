import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Szempontok from '../Szempontok'

function Show() {
    let { index } = useParams();
	const navigate = useNavigate();
    const [data, setData] = useState({});
	
	const token = localStorage.getItem("token")

	const adatokLekerese = async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/szempontsor/'+index, {
				headers: { 
					'Content-type': 'application/vnd.api+json',
					'Accept': 'application/vnd.api+json',
					'Authorization': `Bearer ${token}` 
				}
			});
			setData(res.data.data);
		} catch (error) {
	        console.log(error);
			alert(error.message)
			return
		}
	};
	useEffect(() => {adatokLekerese()}, []);

	const vissza = () => { navigate('../szempontsorok')}
    
  return (
	data.id ?
    <div>
        <h1>A szempontsor részletei</h1>
		<p>Id: {data.id}</p>
        <p>Szempontsor megnvezése: {data.megnevezes}</p>
		<p>Iskola: {data.iskola_nev}</p>
		<p>Lezárva: {data.lezarva ? "igen" : "nem"}</p>
		<p>Létrehozva: {data.created_at}</p>
		<p>Módosítva: {data.updated_at}</p>
		<br />
		<br />
		<Szempontok szempontsor = {index}/>
		<br />
		<Button variant='info' onClick={vissza}>Vissza a szempontsorok listájához</Button>
    </div>
	:
	<></>
  )
}
export default Show