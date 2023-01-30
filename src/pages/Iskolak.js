import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Button, Card } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import Login from'../components/Login'
import Show from'./Iskolak/Show'

export default function Iskolak() {
	const token = localStorage.getItem("token")
	const iskolaID = localStorage.getItem("iskolaID")

	const [data, setData] = useState([]);
	const navigate = useNavigate();
	
	const adatokLekerese = async () => {
		try {

			const res = await axios.get('http://localhost:8000/api/iskola', {
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
	const navNew = () => { navigate('./new')}
	const navShow = (id) => { navigate('./show/'+id)}
	const navDelete = (id) => { navigate('./delete/'+id) }

	const arr = data.map((data, index) => {
		return (
			iskolaID==='1' ?
				<tr key={index}>
					<td onClick={()=>navShow(data.id)}>{data.id}</td>
					<td onClick={()=>navShow(data.id)}>{data.nev}</td>
					<td onClick={()=>navShow(data.id)}>{data.varos}</td>
					
					<td>
						<Button variant='success' onClick={()=> {
							navigate('./edit/'+data.id,{state:{
								nev: data.nev,
								omAzonosito: data.om_azonosito,
								iranyitoszam: data.iranyitoszam,
								varos: data.varos,
								utca: data.utca,
								telefon: data.telefon,
								email: data.email,
								logo: data.logo,
								fenykep: 'fénykép'}}
							)}}>
						Szerkesztés
						</Button>
					</td>
					<td><Button variant='danger' onClick={()=>navDelete(data.id)}>Törlés</Button></td>
				</tr>
			:
				<>
					<p>Id = {data.id}</p>
					<p>Iskola neve: {data.nev}</p>
					<p>Irányítószám: {data.iranyitoszam}</p>
					<p>Város: {data.varos}</p>
					<p>Utca: {data.utca}</p>
					<p>Telefon: {data.telefon}</p>
					<p>E-mail: {data.email}</p>
					<p>Létrehozva: {data.created_at}</p>
					<p>Módosítva: {data.updated_at}</p>
					<Button variant='success' onClick={()=> {
						navigate('./edit/'+data.id,{state:{
							nev: data.nev,
							omAzonosito: data.om_azonosito,
							iranyitoszam: data.iranyitoszam,
							varos: data.varos,
							utca: data.utca,
							telefon: data.telefon,
							email: data.email,
							logo: data.logo,
							fenykep: 'fénykép'}}
						)}}>
					Szerkesztés
					</Button>
				</>				
		)
	})

	return (
		token ?
			iskolaID==='1' ?			
			<div>
				<h1>Iskolák</h1>
				<Button variant='info' className='mb-3' onClick={navNew}>Új iskola beírása</Button>
				<Table striped bordered hover responsive>
					<thead><tr>
						<th>Id</th>
						<th>Név</th>
						<th>Város</th>
						<th />
						<th />
						
					</tr></thead>
					<tbody>{arr}</tbody>
				</Table>
			
				<p>Iskolák száma: {arr.length}</p>
			</div>
			:
			<div>
				<h1>Az iskola adatai</h1>
				<Card>
					<Card.Body>
						{arr}
					</Card.Body>
				</Card>
			</div>

		: <Login />
	);
}