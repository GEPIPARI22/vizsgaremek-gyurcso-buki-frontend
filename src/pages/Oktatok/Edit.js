import {useState, useEffect} from 'react';
import {Form, Card, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {useParams, useLocation, useNavigate} from 'react-router-dom'

function Edit() {

  let { index } = useParams();
  const {state} = useLocation();
  const {vezeteknev, keresztnev, omAzonosito, iskolaID, munkakorID, vegzettsegek, tovabbkepzesek, oneletrajz} = state || {};
  const [formVezeteknev, setFormVezeteknev] = useState(state.vezeteknev);
  const [formKeresztnev, setFormKeresztnev] = useState(state.keresztnev);
  const [formOMazonosito, setFormOMazonosito] = useState(state.omAzonosito);
  const [formIskolaID, setFormIskolaID] = useState(state.iskolaID);
  const [formMunkakorID, setFormMunkakorID] = useState(state.munkakorID);
  const [formVegzettsegek, setFormVegzettsegek] = useState(state.vegzettsegek);
  const [formTovabbkepzesek, setFormTovabbkepzesek] = useState(state.tovabbkepzesek);
  const [formOneletrajz, setFormOneletrajz] = useState(state.oneletrajz);

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const [iskolak, setIskolak] = useState([]);
    const [munkakorok, setMunkakorok] = useState([]);

    const iskolakLekerese = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/iskola', {
          headers: { 
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${token}`
          }
        });
        setIskolak(res.data.data);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    
    const arrIskolak = iskolak.map((data, index) => {
      return (
        <option key={data.id} value={data.id} selected={data.id === formIskolaID}>
          {data.nev}</option>
      )
    })

    const munkakorokLekerese = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/munkakor', {
          headers: { 
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${token}`
          }
        });
        setMunkakorok(res.data.data);
      } catch (err) {
        alert(err);
      }
    };

    const arrMunkakorok = munkakorok.map((data, index) => {
      return (
        <option key={data.id} value={data.id} selected={data.id === formMunkakorID}>
          {data.munkakor}</option>
      )
    })

    useEffect(() => {
      iskolakLekerese()
      munkakorokLekerese()
    }, []);

    const adatokKuldese = () => {
      var config = {
        method: 'patch',
        url: 'http://localhost:8000/api/oktato/'+index,
        headers: { 
          'Accept': 'application/vnd.api+json', 
          'Content-Type': 'application/vnd.api+json', 
          'Authorization': 'Bearer '+token
        },
        data: {
          'vezeteknev': formVezeteknev,
          'keresztnev': formKeresztnev,
          'om_azonosito': formOMazonosito,
            
          'iskola_id': formIskolaID,
          'munkakor_id': formMunkakorID,
          
          'vegzettsegek': formVegzettsegek,
          'tovabbkepzesek': formTovabbkepzesek,
          'oneletrajz': formOneletrajz
        }
      };
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        navigate("../oktatok")
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  return (
    <>
    <h1>Adatok szerkesztése</h1>
    <Row pt={5}>
      <Col lg="6">
      <Form>
          <Form.Group className="mb-3">
            <Form.Label>Vezetéknév: </Form.Label>
            <Form.Control type="text" placeholder="Írd be a vezetéknevet!" value={formVezeteknev} 
              onChange={(e) => { setFormVezeteknev(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Keresztnév: </Form.Label>
            <Form.Control type="text" placeholder="Írd be a kesztnevet!" value={formKeresztnev} 
              onChange={(e) => { setFormKeresztnev(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>OM azonosító: </Form.Label>
            <Form.Control type="text" placeholder="OM azonosító" value={formOMazonosito} 
              onChange={(e) => { setFormOMazonosito(e.target.value) }}/>
          </Form.Group>

         {/*  <Form.Group className="mb-3">
            <Form.Label>Iskola ID: </Form.Label>
            <Form.Control type="text" placeholder="Iskola ID" value={formIskolaID} 
              onChange={(e) => { setFormIskolaID(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Munkakör ID: </Form.Label>
            <Form.Control type="text" placeholder="Munkakör ID" value={formMunkakorID} 
              onChange={(e) => { setFormMunkakorID(e.target.value) }}/>
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => { setFormIskolaID(e.target.value) }}>
              
              {arrIskolak}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => { setFormMunkakorID(e.target.value) }}>
             
              {arrMunkakorok}
            </Form.Select>
          </Form.Group>

          {/* <Form.Group className="mb-3">
            <Form.Label>Végzettségek: </Form.Label>
            <Form.Control type="text" placeholder="Végzettségek" value={formVegzettsegek} 
              onChange={(e) => { setFormVegzettsegek(e.target.value) }}/>
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Végzettségek: </Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Végzettségek" value={formVegzettsegek} 
              onChange={(e) => { setFormVegzettsegek(e.target.value) }}
              />
          </Form.Group>
          Végzettségek: {formVegzettsegek}<br />

          {/* <Form.Group className="mb-3">
            <Form.Label>Továbbképzések: </Form.Label>
            <Form.Control type="text" placeholder="Továbbképzések" value={formTovabbkepzesek} 
              onChange={(e) => { setFormTovabbkepzesek(e.target.value) }}/>
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Továbbképzések: </Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Továbbképzések" value={formTovabbkepzesek} 
              onChange={(e) => { setFormTovabbkepzesek(e.target.value) }}/>
          </Form.Group>
          Továbbképzések: {formTovabbkepzesek}<br />

          <Form.Group className="mb-3">
            <Form.Label>Önéletrajz: </Form.Label>
            <Form.Control type="text" placeholder="Önéletrajz" value={formOneletrajz} 
              onChange={(e) => { setFormOneletrajz(e.target.value) }}/>
          </Form.Group>

          <Button onClick = {adatokKuldese}>Adatok küldése</Button>

        </Form>
        <Button variant='light' onClick = {()=>navigate('../oktatok')}>Vissza az oktatók listájához</Button>
      </Col>
    </Row>
    </>
  )
}

export default Edit