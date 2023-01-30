import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function Show() {
    let { index } = useParams();
	const navigate = useNavigate();
    const [data, setData] = useState({});

	const token = localStorage.getItem("token")

	/* const showMultiline = (text) => {
		text.split("\n").map(function(item, index) {
			return (<span key={index}>{item}<br /></span>)
			})
	} */

	const adatokLekerese = async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/oktato/'+index, {
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

	const navOktatok = () => { navigate('../oktatok')}
    
  return (
    <div>
        <h1>Az oktató adatai</h1>
		<p>Id: {data.id}</p>
        <p>Vezetéknév: {data.vezeteknev}</p>
		<p>Keresztnév: {data.keresztnev}</p>
		<p>OM azonosító: {data.om_azonosito}</p>
		<p>Iskola neve: {data.iskola_nev}</p>
		<p>Munkakör: {data.munkakor_munkakor}</p>
		<Form.Group className="mb-3">
			<Form.Label>Végzettségek</Form.Label>
			<Form.Control as="textarea" rows={6} readOnly plaintext value={data.vegzettsegek}/>
      	</Form.Group>
		<p>Továbbképzések: {data.tovabbkepzesek}</p>
		<p>Önéletrajz: {data.oneletrajz}</p>
		<Button variant='info' onClick={navOktatok}>Vissza</Button>
    </div>
  )
}
export default Show