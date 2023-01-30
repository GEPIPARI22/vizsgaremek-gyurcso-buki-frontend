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

	const HuFormatter = new Intl.DateTimeFormat('hu-Hu')
	const huDateFormat = (d) => {
		const d2 = new Date (d)
		const d3 = HuFormatter.format(d2)
		return d3
	}

	const adatokLekerese = async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/users/'+index, {
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
        <h1>{data.name}</h1>
		<br></br>
		<p>Id: {data.id}</p>
        <p>Vezetéknév: {data.vezeteknev}</p>
		<p>Keresztnév: {data.keresztnev}</p>
		<p>Email: {data.email}</p>
		<p>Iskola: {data.iskola_nev}</p>
		<p>Munkakör: {data.munkakor_munkakor}</p>
		<p>Írási jogosultság: {data.jog_iras ? "igen" : "nem"}</p>
		<p>Értéklési jogosultság: {data.jog_ertekeles ? "igen" : "nem"}</p>
		<p>Adminisztrációs jogosultság: {data.jog_admin ? "igen" : "nem"}</p>
		<hr></hr>
		<p>Létrehozva: {(data.created_at)}</p>
		<p>Módosítva: {(data.updated_at)}</p>
		<br></br>
		
		{/* {huDateFormat(data.created_at)} */}
		<Button variant='info' onClick={vissza}>Vissza</Button>
    </div>
  )
}
export default Show