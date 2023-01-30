import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import Login from'../components/Login'

export default function Munkakorok() {
	const token = localStorage.getItem("token")

	const [data, setData] = useState([]);
	const navigate = useNavigate();
	
	const adatokLekerese = async () => {
		try {

			const res = await axios.get('http://localhost:8000/api/munkakor', {
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
	const navNew = () => { navigate('new')}
	//const navShow = (id) => { navigate('show/'+id)}
	const navDelete = (id) => { navigate('delete/'+id) }

	const arr = data.map((data, index) => {
		return (
			<tr key={data.id}>
				<td>{data.id}</td>
				<td>{data.munkakor}</td>
				
				<td>
					<Button variant='success' onClick={()=> {
						navigate('./edit/'+data.id,{state:{
							munkakor: data.munkakor
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
			<h1>Munkakörök</h1>
			<Button variant='info' className='mb-3' onClick={navNew}>Új munkakör beírása</Button>
			<Table striped bordered>
				<thead><tr>
					<th>Id</th>
					<th>Munkakör</th>
					<th />
					<th />
					
				</tr></thead>
				<tbody>{arr}</tbody>
			</Table>
		
			<p>Munkakörök száma: {arr.length}</p>
		</div>

		: <Login />
	);
}