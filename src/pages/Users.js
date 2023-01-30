import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import Login from'../components/Login'

export default function Users() {
	const token = localStorage.getItem("token")

	const [data, setData] = useState([]);
	const navigate = useNavigate();
	
	const adatokLekerese = async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/users', {
				headers: { 
					'Content-type': 'application/vnd.api+json',
					'Accept': 'application/vnd.api+json',
					'Authorization': `Bearer ${token}`
				}
			});
			setData(res.data.data);
			
		} catch (error) {
			console.log(error);
			alert(error.response.statusText)
		}
	};

	useEffect(() => {adatokLekerese()}, []);
	const navNew = () => { navigate('new')}
	const navShow = (id) => { navigate('show/'+id)}
	const navDelete = (id) => { navigate('delete/'+id) }

	const arr = data.map((data, index) => {
		return (
			<tr key={data.id}>
				<td onClick={()=>navShow(data.id)}>{data.id}</td>
				<td onClick={()=>navShow(data.id)}>{data.name}</td>
                <td onClick={()=>navShow(data.id)}>{data.email}</td>
				<td onClick={()=>navShow(data.id)}>{data.vezeteknev}</td>
                <td onClick={()=>navShow(data.id)}>{data.keresztnev}</td>
                <td onClick={()=>navShow(data.id)}>{data.iskola_nev}</td>
                <td onClick={()=>navShow(data.id)}>{data.munkakor_munkakor}</td>
				<td>
					<Button variant='success' onClick={()=> {
						navigate('./edit/'+data.id,{state:{
							name: data.name,
                            email: data.email,
                            vezeteknev: data.vezeteknev,
							keresztnev: data.keresztnev, 
							iskolaID: data.iskola_id,
							munkakorID: data.munkakor_id,
							jogIras: data.jog_iras,
							jogErtekeles: data.jog_ertekeles,
							jogAdmin: data.jog_admin
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
			<h1>Felhasználók</h1>
			<Button variant='info' className='mb-3' onClick={navNew}>Új felhasználó beírása</Button>
			<Table striped bordered hover responsive>
				<thead><tr>
					<th>Id</th>
					<th>Név</th>
					<th>Email</th>
                    <th>Vezetéknév</th>
                    <th>Keresztnév</th>
                    <th>Iskola</th>
                    <th>Munkakör</th>
					<th />
					<th />
				</tr></thead>
				<tbody>{arr}</tbody>
			</Table>
		
			<p>Felhasználók száma: {arr.length}</p>
		</div>

		: <Login />
	);
}