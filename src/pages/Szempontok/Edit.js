import {useState} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {useParams, useLocation, useNavigate} from 'react-router-dom'

function Edit() {

  let { index } = useParams();
  const {state} = useLocation();
  const { szempontsorID, terulet, szempont, magyarazat, kiegeszites, kapcsolodo, adatforras, ertek, sulyszorzo, sulyozott } = state || {};

    const [formSzempontsorID, setFormSzempontsorID] = useState(state.szempontsorID);
    const [formTerulet, setFormTerulet] = useState(state.terulet);
    const [formSzempont, setFormSzempont] = useState(state.szempont);
    const [formMagyarazat, setFormMagyarazat] = useState(state.magyarazat);
    const [formKiegeszites, setFormKiegeszites] = useState(state.kiegeszites);
    const [formKapcsolodo, setFormKapcsolodo] = useState(state.kapcsolodo);
    const [formAdatforras, setFormAdatforras] = useState(state.adatforras);
    const [formErtek, setFormErtek] = useState(state.ertek);
    const [formSulyszorzo, setFormSulyszorzo] = useState(state.sulyszorzo);
    const [formSulyozott, setFormSulyozott] = useState(state.sulyozott);

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const adatokKuldese = () => {
      var config = {
        method: 'patch',
        url: 'http://localhost:8000/api/szempont/'+index,
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
    <h1>Szempont szerkeszt??se</h1>
    <Row pt={5}>
    <Col lg="6">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Szempontsor: </Form.Label>
            <Form.Control type="text" placeholder="??rd be a szempontsor ID-t!" value={formSzempontsorID} 
              onChange={(e) => { setFormSzempontsorID(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ter??let: </Form.Label>
            <Form.Control type="text" placeholder="Ter??let" value={formTerulet} 
              onChange={(e) => { setFormTerulet(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Szempont: </Form.Label>
            <Form.Control type="text" placeholder="Szempont" value={formSzempont} 
              onChange={(e) => { setFormSzempont(e.target.value) }}/>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Magyar??zat: </Form.Label>
            <Form.Control type="text" placeholder="Magyar??zat" value={formMagyarazat} 
              onChange={(e) => { setFormMagyarazat(e.target.value) }}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Kieg??sz??t??s: </Form.Label>
            <Form.Control type="text" placeholder="Kieg??sz??t??s" value={formKiegeszites} 
              onChange={(e) => { setFormKiegeszites(e.target.value) }}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Kapcsol??d??: </Form.Label>
            <Form.Control type="text" placeholder="Kapcsol??d?? tartalom, amit az ioskola hat??roz meg." value={formKapcsolodo} 
              onChange={(e) => { setFormKapcsolodo(e.target.value) }}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adatok forr??sa: </Form.Label>
            <Form.Control type="text" placeholder="Adatok forr??sa" value={formAdatforras} 
              onChange={(e) => { setFormAdatforras(e.target.value) }}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>??rt??k: </Form.Label>
            <Form.Control type="text" placeholder="??rt??k" value={formErtek} 
              onChange={(e) => { setFormErtek(e.target.value) }}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>S??lyszorz??: </Form.Label>
            <Form.Control type="text" placeholder="S??lyszorz??" value={formSulyszorzo} 
              onChange={(e) => { setFormSulyszorzo(e.target.value) }}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>S??lyozott: </Form.Label>
            <Form.Control type="text" placeholder="S??lyozott ??rt??k" value={formSulyozott} 
              onChange={(e) => { setFormSulyozott(e.target.value) }}/>
          </Form.Group>

          <Button onClick = {adatokKuldese}>Adatok k??ld??se</Button>
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default Edit