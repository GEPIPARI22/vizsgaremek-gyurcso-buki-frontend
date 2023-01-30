import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import Login from'../components/Login'


export default function Szempontsorok(props) {
	const token = localStorage.getItem("token")
	const szempontsor = props.szempontsor

	const [data, setData] = useState([]);
	const navigate = useNavigate();
	
	const adatokLekerese = async () => {
		try {
			const res = await axios.get('http://localhost:8000/api/szempont/szempontsor/'+szempontsor, {
				headers: { 
					'Content-type': 'application/vnd.api+json',
					'Accept': 'application/vnd.api+json',
					'Authorization': `Bearer ${token}`,
				}
			});
			setData(res.data.data);
		} catch (error) {
			//console.log(error);
			alert(error.response.data.message)
			return
		}
	};

	useEffect(() => {
		adatokLekerese()
	}, []);
	const navNew = () => { navigate('../szempontok/new',{state:{
		szempontsorID: szempontsor,
		//szempontsor: data.szempontsor_megnevezes
	}})}
	const navShow = (id) => { navigate('../szempontok/show/'+id)}
	const navDelete = (id) => { navigate('../szempontok/delete/'+id)}

	const arr = data.map((data, index) => {
		return (
			<tr key={data.id}>
				
				
                <td onClick={()=>navShow(data.id)}>{data.terulet}</td>
                <td onClick={()=>navShow(data.id)}>{data.szempont}</td>
                <td onClick={()=>navShow(data.id)}>{data.ertek}</td>
                <td onClick={()=>navShow(data.id)}>{data.sulyszorzo}</td>
                <td onClick={()=>navShow(data.id)}>{data.sulyozott}</td>
				<td>
					<Button variant='success' className='mb-3' onClick={()=> {
						navigate('../szempontok/edit/'+data.id,{state:{
							szempontsorID: data.szempontsor_id,
                            terulet: data.terulet,
                            szempont: data.szempont,
                            magyarazat: data.magyarazat,
                            kiegeszites: data.kiegeszites,
                            kapcsolodo: data.kapcsolodo,
                            adatforras: data.adatforras,
                            ertek: data.ertek,
                            sulyszorzo: data.sulyszorzo,
                            sulyozott: data.sulyozott
						}}
						)}}>
					Szerkesztés
					</Button>
				</td>
				<td><Button variant='danger' onClick={()=>navDelete(index = data.id)}>Törlés</Button></td>
			</tr>
		)
	})

	return (
		token ?
		<div>
			<h1>Szempontok</h1>
			<Button variant='info' onClick={navNew}>Új szempont rögzítése</Button>
			<Table striped bordered hover responsive>
				<thead><tr>
					
                    
					<th>Terület</th>
                    <th>Szempont</th>
                    <th>Érték</th>
                    <th>Súlyszorzó</th>
                    <th>Súlyozott</th>
					<th />
					<th />
				</tr></thead>
				<tbody>{arr}</tbody>
			</Table>
		
			<p>Szempontok száma: {arr.length}</p>
		</div>

		: <Login />
	);
}