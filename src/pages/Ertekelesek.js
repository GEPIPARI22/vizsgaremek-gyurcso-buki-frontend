import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
import Login from'../components/Login'
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


export default function Ertekelesek() {
	const token = localStorage.getItem("token")
	const iskola = localStorage.getItem("iskolaID")

	const [data, setData] = useState([]);
	const navigate = useNavigate();
	
	const adatokLekerese = async () => {
		try {

			const res = await axios.get('http://localhost:8000/api/ertekeles', {
				headers: { 
					'Content-type': 'application/vnd.api+json',
					'Accept': 'application/vnd.api+json',
					'Authorization': `Bearer ${token}`
				}
			});
			setData(res.data.data);
			
		} catch (error) {
			console.log(error.response.data.message);
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
					<td onClick={()=>navShow(data.id)}>{data.oktato.vezeteknev}</td>
					<td onClick={()=>navShow(data.id)}>{data.oktato.keresztnev}</td>
					<td onClick={()=>navShow(data.id)}>{data.oktato.om_azonosito}</td>
					<td onClick={()=>navShow(data.id)}>{data.oktato.iskola.nev}</td>
					<td onClick={()=>navShow(data.id)}>{data.idopont}</td>
					<td onClick={()=>navShow(data.id)}>{data.szempontsor_megnevezes}</td>
					<td onClick={()=>navShow(data.id)}></td>
					<td onClick={()=>navShow(data.id)}>{data.lezarva}</td>
					
					<td>
						<Button className='m-1' variant='success' onClick={()=> {
							navigate('./edit/'+data.id,{state:{
								oktatoID: data.oktato.id,
								szempontsorID: data.szempontsor_id,
								idopont: data.idopont,
								terulet1: data.terulet1,
								terulet2: data.terulet2,
								terulet3: data.terulet3,
								terulet4: data.terulet4,
								terulet5: data.terulet5,
								terulet6: data.terulet6,
								terulet7: data.terulet7,
								terulet8: data.terulet8,
								terulet9: data.terulet9,
								terulet10: data.terulet10,
								lezarva: data.lezarva
							}}
							)}}>
						<FaEdit /> 
						</Button>  
					<Button className='m-1' variant='danger' onClick={()=>navDelete(data.id)}><FaTrashAlt /></Button></td>
				</tr>
				
				)
	})

	return (
		token ?
		<div>
			<h1>Oktatói értékelések</h1>
			<Button variant='info' className='mb-3' onClick={navNew}>Új értékelés rögzítése</Button>
			<Table striped bordered hover responsive>
				<thead><tr>
					<th>Id</th>
					<th>Vezetéknév</th>
                    <th>Keresztnév</th>
					<th>OM azonosító</th>
					<th>Iskola</th>
					<th>Időpont</th>
					<th>Szempontsor</th>
					<th>Eredmény</th>
                    <th>Lezárva</th>
					<th />
					
				</tr></thead>
				<tbody>{arr}</tbody>
			</Table>
		
			<p></p>
			
		</div>

		: <Login />
	);
}