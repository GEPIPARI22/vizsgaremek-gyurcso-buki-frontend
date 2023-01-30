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
			const res = await axios.get('http://localhost:8000/api/ertekeles/'+index, {
				headers: { 
					'Content-type': 'application/vnd.api+json',
					'Accept': 'application/vnd.api+json',
					'Authorization': `Bearer ${token}` 
				}
			});
			setData(res.data.data);
		} catch (error) {
        console.log(error);
        alert(error.message)}
	};
	useEffect(() => {adatokLekerese()}, []);

	const vissza = () => { navigate('../ertekelesek')}
    
  return (
	
    <div>
		
        <h1>Az értékelés részletei</h1>
		<p>Id: {data.id}</p>
        <p>Vezetéknév: {data.oktato_vezeteknev}</p>
		<p>Keresztnév: {data.oktato_keresztnev}</p>
		<p>Iskola: {data.oktato_iskola_nev}</p>
		<p>Időpont: {data.idopont}</p>
		<p>Szempontsor: {data.szempontsor_megnevezes}</p>
		<p>{data.terulet1}</p>
		<p>{data.terulet2}</p>
		<p>{data.terulet3}</p>
		<p>{data.terulet4}</p>
		<p>{data.terulet5}</p>
		<p>{data.terulet6}</p>
		<p>{data.terulet7}</p>
		<p>{data.terulet8}</p>
		<p>{data.terulet9}</p>
		<p>{data.terulet10}</p>
		<p>Lezárva: {data.lezarva}</p>
		<p>Létrehozva: {data.created_at}</p>
		<p>Módosítva: {data.updated_at}</p>
		
		<Button variant='info' onClick={vissza}>Vissza az értékelések listájához</Button>

		
    </div>
  )
}
export default Show