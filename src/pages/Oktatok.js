import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import Login from'../components/Login'

export default function Oktatok() {
	const token = localStorage.getItem("token")
	const iskola = localStorage.getItem("iskolaID")

	const [data, setData] = useState([]);
	const navigate = useNavigate();
	
	const adatokLekerese = async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/oktato', {
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
	//const navNew = () => { navigate('new')}

	const navNew = () => { navigate('new',{state:{
		iskolaID: iskola,
		//szempontsor: data.szempontsor_megnevezes
	}})}

	const navShow = (id) => { navigate('show/'+id)}
	const navDelete = (id) => { navigate('delete/'+id) }

	const arr = data.map((data, index) => {
		return (
			<tr key={data.id}>
				
				<td onClick={()=>navShow(data.id)}>{data.vezeteknev}</td>
				<td onClick={()=>navShow(data.id)}>{data.keresztnev}</td>
				<td onClick={()=>navShow(data.id)}>{data.om_azonosito}</td>
				<td onClick={()=>navShow(data.id)}>{data.iskola_nev}</td>
				<td>
					<Button variant='success' className='mb-3' onClick={()=> {
						navigate('./edit/'+data.id,{state:{
							vezeteknev: data.vezeteknev, 
							keresztnev: data.keresztnev, 
							omAzonosito: data.om_azonosito,
							iskolaID: data.iskola_id,
							munkakorID: data.munkakor_id,
							vegzettsegek: data.vegzettsegek,
							tovabbkepzesek: data.tovabbkepzesek,
							oneletrajz: data.oneletrajz
						}}
						)}}>
					Szerkesztés
					</Button>
				</td>
				<td><Button variant='danger' onClick={()=>navDelete(data.id)}>Törlés</Button></td>
			</tr>
		)
	})

	return (
		token ?
		<div>
			<h1>Oktatók</h1>
			<Button variant='info' className='mb-3' onClick={navNew}>Új oktató beírása</Button>
			<Table striped bordered hover responsive>
				<thead><tr>
					
					<th>Vezetéknév</th>
					<th>Keresztnév</th>
					<th>OM azonosító</th>
					<th>Iskola</th>
					<th />
					<th />
				</tr></thead>
				<tbody>{arr}</tbody>
			</Table>
		
			<p>Oktatók száma: {arr.length}</p>
		</div>

		: <Login />
	);
}