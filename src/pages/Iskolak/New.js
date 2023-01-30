import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

function New() {
  
    const [formNev, setFormNev] = useState('');
    const [formOMazonosito, setFormOMazonosito] = useState('');
    const [formIranyitoszam, setFormIranyitoszam] = useState('');
    const [formVaros, setFormVaros] = useState('');
    const [formUtca, setFormUtca] = useState('');
    const [formTelefon, setFormTelefon] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formLogo, setFormLogo] = useState('');
    
    const token = localStorage.getItem("token")
    const navigate = useNavigate()


    const adatokKuldese = () => {
      var config = {
        method: 'post',
        url: 'http://localhost:8000/api/iskola',
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
          'fenykep': 'fénykép'
        }
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate('../iskolak')
      })
      .catch(function (error) {
        //console.log(error);
        alert(error.response.data.message)
      });
      
    };

  return (
    <>
    <h1>Töltsd ki az űrlapot!</h1>
    <Row pt={5}>
      <Col lg="6">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Név: </Form.Label>
            <Form.Control type="text" placeholder="Írd be a teendőt!" value={formNev} 
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

          <Button onClick = {adatokKuldese}>Adatok küldése</Button>

        </Form>
        <Button variant='light' onClick = {()=>navigate('../iskolak')}>Vissza az iskolák listájához</Button>
      </Col>

    </Row>
    </>
  )
}

export default New