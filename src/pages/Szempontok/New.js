import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

function New() {

  const {state} = useLocation();
  const { szempontsorID, szempontsorMegnevezes} = state || {};
  
    const [formSzempontsorID, setFormSzempontsorID] = useState(state.szempontsorID);
    const [formTerulet, setFormTerulet] = useState('');
    const [formSzempont, setFormSzempont] = useState('');
    const [formMagyarazat, setFormMagyarazat] = useState('');
    const [formKiegeszites, setFormKiegeszites] = useState('');
    const [formKapcsolodo, setFormKapcsolodo] = useState('');
    const [formAdatforras, setFormAdatforras] = useState('');
    const [formErtek, setFormErtek] = useState('');
    const [formSulyszorzo, setFormSulyszorzo] = useState('');
    const [formSulyozott, setFormSulyozott] = useState('');
    

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const adatokKuldese = () => {
      var config = {
        method: 'post',
        url: 'http://localhost:8000/api/szempont',
        headers: { 
          'Accept': 'application/vnd.api+json', 
          'Content-Type': 'application/vnd.api+json', 
          'Authorization': 'Bearer '+token
        },
        data: {
          'szempontsor_id': formSzempontsorID,
          'terulet': formTerulet,
          'szempont': formSzempont,
          'magyarazat': formMagyarazat,
          'kiegeszites': formKiegeszites,
          'kapcsolodo': formKapcsolodo,
          'adatforras': formAdatforras,
          'ertek': formErtek,
          'sulyszorzo': formSulyszorzo,
          'sulyozott': formSulyozott
        }
      };
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        navigate(-1)
      })
      .catch(function (error) {
        //console.log(error);
        alert(error.response.data.message)
      });
    };

  return (
    <>
    <h1>Új szempont beírása</h1>
    <Row pt={5}>
      <Col lg="6">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Szempontsor ID: {formSzempontsorID} </Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Terület: </Form.Label>
            <Form.Control type="text" placeholder="Terület" value={formTerulet} 
              onChange={(e) => { setFormTerulet(e.target.value) }}/>
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Szempont: </Form.Label>
            <Form.Control type="text" placeholder="Szempont" value={formSzempont} 
              onChange={(e) => { setFormSzempont(e.target.value) }}/>
          </Form.Group> */}
          
          <Form.Group className="mb-3">
            <Form.Label>Szempont: </Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Szempont" value={formSzempont} 
              onChange={(e) => { setFormSzempont(e.target.value) }}/>
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Magyarázat: </Form.Label>
            <Form.Control type="text" placeholder="Magyarázat" value={formMagyarazat} 
              onChange={(e) => { setFormMagyarazat(e.target.value) }}/>
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Magyarázat: </Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Magyarázat" value={formMagyarazat} 
              onChange={(e) => { setFormMagyarazat(e.target.value) }}
              />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Kiegészítés: </Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Kiegészítés" value={formKiegeszites} 
              onChange={(e) => { setFormKiegeszites(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Kapcsolódó: </Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Kapcsolódó tartalom, amit az iskola határoz meg." value={formKapcsolodo} 
              onChange={(e) => { setFormKapcsolodo(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Adatok forrása: </Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Adatok forrása" value={formAdatforras} 
              onChange={(e) => { setFormAdatforras(e.target.value) }}/>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Érték: </Form.Label>
            <Form.Control type="text" placeholder="Érték" value={formErtek} 
              onChange={(e) => { setFormErtek(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Súlyszorzó: </Form.Label>
            <Form.Control type="text" placeholder="Súlyszorzó" value={formSulyszorzo} 
              onChange={(e) => { setFormSulyszorzo(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Súlyozott: </Form.Label>
            <Form.Control type="text" placeholder="Súlyozott érték" defaultValue={formSulyozott}
              onChange={(e) => { setFormSulyozott(e.target.value) }}/>
          </Form.Group>

          <Button onClick = {adatokKuldese}>Adatok küldése</Button>
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default New