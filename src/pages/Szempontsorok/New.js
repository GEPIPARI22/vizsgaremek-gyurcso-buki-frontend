import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

function New() {
  
    const token = localStorage.getItem("token")
    const iskola = localStorage.getItem("iskolaID")
    const navigate = useNavigate()

    const [formMegnevezes, setFormMegnevezes] = useState('');
    const [formIskolaID, setFormIskolaiD] = useState(iskola);
    const [formLezarva, setFormLezarva] = useState(false);

    

    const handleOnChangeLezarva = () => {
      setFormLezarva(!formLezarva)
    };

    const adatokKuldese = () => {
      var config = {
        method: 'post',
        url: 'http://localhost:8000/api/szempontsor',
        
        headers: { 
          'Accept': 'application/vnd.api+json', 
          'Content-Type': 'application/vnd.api+json', 
          'Authorization': 'Bearer '+token
        },
        data: {
          'megnevezes': formMegnevezes,
          'iskola_id': formIskolaID,
          'lezarva': formLezarva
        }
      };
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        navigate('../szempontsorok')
      })
      .catch(function (error) {
        //console.log(error);
        alert(error.response.data.message)
      });
    };

  return (
    <>
    <h1>Új szempontsor beírása</h1>
    <Row pt={5}>
      <Col lg="6">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Megnevezés: </Form.Label>
            <Form.Control type="text" placeholder="Írd be a szempontsor megnevezését!" value={formMegnevezes} 
              onChange={(e) => { setFormMegnevezes(e.target.value) }}/>
          </Form.Group>

          Iskola ID: {iskola}<br />

          <Form.Check id="lezarva" type="switch" label="Lezárva"
              checked={formLezarva}
              onChange={handleOnChangeLezarva}
            />

          <Button onClick = {adatokKuldese}>Adatok küldése</Button>
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default New