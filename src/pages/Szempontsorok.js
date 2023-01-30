import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import Login from'../components/Login'

export default function Szempontsorok() {
	const token = localStorage.getItem("token")

	const [data, setData] = useState([]);
	const navigate = useNavigate();
	
	const adatokLekerese = async () => {
		try {

			const res = await axios.get('http://localhost:8000/api/szempontsor', {
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
	const navShow = (id) => { navigate('show/'+id)}
	const navDelete = (id) => { navigate('delete/'+id)}

	const arr = data.map((data, index) => {
		return (
			<tr key={data.id}>
				<td onClick={()=>navShow(data.id)}>{data.id}</td>
				<td onClick={()=>navShow(data.id)}>{data.megnevezes}</td>
                <td onClick={()=>navShow(data.id)}>{data.iskola_nev}</td>
                <td onClick={()=>navShow(data.id)}>{data.lezarva ? "igen" : "nem"}</td>
				
				<td>
					<Button variant='success' onClick={()=> {
						navigate('./edit/'+data.id,{state:{
							megnevezes: data.megnevezes,
                            iskolaID: data.iskola_id,
                            lezarva: data.lezarva
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
			<h1>Szempontsorok</h1>
			<Button variant='info' className='mb-3' onClick={navNew}>Új szempontsor rögzítése</Button>
			<Table striped bordered hover responsive>
				<thead><tr>
					<th>Id</th>
					<th>Szempontsor</th>
                    <th>Iskola</th>
                    <th>Lezárva</th>
					<th />
					<th />
					
				</tr></thead>
				<tbody>{arr}</tbody>
			</Table>
		
			<p>Szempontsorok száma: {arr.length}</p>
			<p></p>
			
		</div>

		

		: <Login />
	);
}