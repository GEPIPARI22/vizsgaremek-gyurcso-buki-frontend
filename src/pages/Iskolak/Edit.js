import {useState} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {useParams, useLocation, useNavigate} from 'react-router-dom'

function Edit() {

  let { index } = useParams();
  const {state} = useLocation();
  const {nev, omAzonosito, iranyitoszam, varos, utca, telefon, email, logo, fenykep } = state || {};
  const [formNev, setFormNev] = useState(state.nev);
  const [formOMazonosito, setFormOMazonosito] = useState(state.omAzonosito);
  const [formIranyitoszam, setFormIranyitoszam] = useState(state.iranyitoszam);
  const [formVaros, setFormVaros] = useState(state.varos);
  const [formUtca, setFormUtca] = useState(state.utca);
  const [formTelefon, setFormTelefon] = useState(state.telefon);
  const [formEmail, setFormEmail] = useState(state.email);
  const [formLogo, setFormLogo] = useState(state.logo);
  const [formFenykep, setFormFenykep] = useState(state.fenykep);
  
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

    const adatokKuldese = () => {
      var config = {
        method: 'patch',
        url: 'http://localhost:8000/api/iskola/'+index,
        headers: { 
          'Accept': 'application/vnd.api+json', 
          'Content-Type': 'application/vnd.api+json', 
          'Authorization': 'Bearer '+token
        },
        data: {
          'nev': formNev,
          'om_azonosito': formOMazonosito,
          'iranyitoszam': formIranyitoszam,
          'varos': formVaros,
          'utca': formUtca,
          'telefon': formTelefon,
          'email': formEmail,
          'logo': formLogo,
          'fenykep': formFenykep
        }
      };
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        navigate("../iskolak")
      })
      .catch(function (error) {
        //console.log(error);
        alert(error.message)      });
    };

  return (
    <>
    <h1>Iskola adatainak szerkesztése</h1>
    <Row pt={5}>
      <Col lg="6">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Név: </Form.Label>
            <Form.Control type="text" placeholder="Név" value={formNev}
              onChange={(e) => { setFormNev(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>OM azonosító: </Form.Label>
            <Form.Control type="text" placeholder="OM azonosító!" value={formOMazonosito} 
              onChange={(e) => { setFormOMazonosito(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Irányítószám: </Form.Label>
            <Form.Control type="text" placeholder="Írd be a teendőt!" value={formIranyitoszam} 
              onChange={(e) => { setFormIranyitoszam(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Város: </Form.Label>
            <Form.Control type="text" placeholder="Város" value={formVaros} 
              onChange={(e) => { setFormVaros(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Utca: </Form.Label>
            <Form.Control type="text" placeholder="Utca" value={formUtca} 
              onChange={(e) => { setFormUtca(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Telefon: </Form.Label>
            <Form.Control type="text" placeholder="Telefonszám" value={formTelefon} 
              onChange={(e) => { setFormTelefon(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email: </Form.Label>
            <Form.Control type="text" placeholder="E-mail cím" value={formEmail} 
              onChange={(e) => { setFormEmail(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Logo: </Form.Label>
            <Form.Control type="text" placeholder="Logo" value={formLogo} 
              onChange={(e) => { setFormLogo(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Logo: </Form.Label>
            <Form.Control type="text" placeholder="Fénykép" value={formFenykep} 
              onChange={(e) => { setFormFenykep(e.target.value) }}/>
          </Form.Group>

          <Button className='mb-3' onClick = {adatokKuldese}>Adatok küldése</Button>
        </Form>
        <Button variant='light' onClick = {()=>navigate('../iskolak')}>Vissza az iskolák listájához</Button>
      </Col>
     
    </Row>
    </>
  )
}

export default Edit