import {useState} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {useParams, useLocation, useNavigate} from 'react-router-dom'

function Edit() {

  let { index } = useParams();
  const {state} = useLocation();
  const { munkakor } = state || {};
    const [formMunkakor, setFormMunkakor] = useState(state.munkakor);

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const adatokKuldese = () => {
      var config = {
        method: 'patch',
        url: 'http://localhost:8000/api/munkakor/'+index,
        headers: { 
          'Accept': 'application/vnd.api+json', 
          'Content-Type': 'application/vnd.api+json', 
          'Authorization': 'Bearer '+token
        },
        data: {
          'munkakor': formMunkakor
        }
      };
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        navigate("../munkakorok")
      })
      .catch(function (error) {
        //console.log(error);
        alert(error.response.data.message)      });
      
    };

  return (
    <>
    <h1>Adat szerkesztése</h1>
    <Row pt={5}>
      <Col lg="6">
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Munkakör: </Form.Label>
            <Form.Control type="text" placeholder="Munkakör" value={formMunkakor} 
              onChange={(e) => { setFormMunkakor(e.target.value) }}/>
          </Form.Group>
          <Button className = 'mb-3' onClick = {adatokKuldese}>Adatok küldése</Button>
        </Form>
        <Button variant='light' onClick = {()=>navigate(-1)}>Vissza</Button>
      </Col>
    </Row>
    </>
  )
}

export default Edit