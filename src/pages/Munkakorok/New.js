import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

function New() {
  
    const [formMunkakor, setFormMunkakor] = useState('');

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const adatokKuldese = () => {
      var config = {
        method: 'post',
        url: 'http://localhost:8000/api/munkakor',
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
        navigate('../munkakorok')
      })
      .catch(function (error) {
        //console.log(error);
        alert(error.response.data.message)
      });
    };

  return (
    <>
    <h1>Új munkakör beírása</h1>
    <Row pt={5}>
      <Col lg="6">
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Munkakör: </Form.Label>
            <Form.Control type="text" placeholder="Írd be a munkakör megnevezését!" value={formMunkakor} 
              onChange={(e) => { setFormMunkakor(e.target.value) }}/>
          </Form.Group>
          
          <Button onClick = {adatokKuldese}>Adatok küldése</Button>
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default New