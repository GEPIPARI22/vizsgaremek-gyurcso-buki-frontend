import {useState} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {useParams, useLocation, useNavigate} from 'react-router-dom'

function Edit() {

  let { index } = useParams();
  const {state} = useLocation();
  const { megnevezes, iskolaID, lezarva } = state || {};

    const [formMegnevezes, setFormMegnevezes] = useState(state.megnevezes);
    const [formIskolaID, setFormIskolaiD] = useState(state.iskolaID);
    const [formLezarva, setFormLezarva] = useState(state.lezarva);

    const token = localStorage.getItem("token")
    const iskola = localStorage.getItem("iskola_id")
    const navigate = useNavigate()

    const handleOnChangeLezarva = () => {
      setFormLezarva(!formLezarva)
    };

    const adatokKuldese = () => {
      var config = {
        method: 'patch',
        url: 'http://localhost:8000/api/szempontsor/'+index,
        headers: { 
          'Accept': 'application/vnd.api+json', 
          'Content-Type': 'application/vnd.api+json', 
          'Authorization': 'Bearer '+token
        },
        data: {
          'megnevezes': formMegnevezes,
          'iskola_id': formIskolaID,
          'lezarva': formLezarva,
        }
      };
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        navigate("../szempontsorok")
      })
      .catch(function (error) {
          //console.log(error);
          alert(error.response.data.message)
      });
    };

  return (
    <>
    <h1>Adat szerkesztése</h1>
    <Row pt={5}>
      <Col lg="6">
      <Form>
          <Form.Group className="mb-3">
            <Form.Label>Megnevezés: </Form.Label>
            <Form.Control type="text" placeholder="Írd be a szempontsor megnevezését!" value={formMegnevezes} 
              onChange={(e) => { setFormMegnevezes(e.target.value) }}/>
          </Form.Group>

          Iskola ID: {iskola}<br />

          {/* <Form.Group className="mb-3">
            <Form.Label>Iskola: </Form.Label>
            <Form.Control type="text" placeholder="Iskola" value={formIskolaID} 
              onChange={(e) => { setFormIskolaiD(e.target.value) }}/>
          </Form.Group> */}
          {/* <Form.Group className="mb-3">
            <Form.Label>Lezárva: </Form.Label>
            <Form.Control type="text" placeholder="Lezárva" value={formLezarva} 
              onChange={(e) => { setFormLezarva(e.target.value) }}/>
          </Form.Group> */}
          
          <Form.Check id="lezarva" type="switch" label="Lezárva"
              checked={formLezarva}
              onChange={handleOnChangeLezarva}
            />

          <Button onClick = {adatokKuldese}>Adatok küldése</Button>
        </Form>
        <Button variant='light' onClick = {()=>navigate('../szempontsorok')}>Vissza a szempontsorok listájához</Button>
      </Col>
    </Row>
    </>
  )
}

export default Edit