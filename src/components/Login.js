import {useState} from 'react';
import {Form, Row, Col, Button, Container, Card, Image} from 'react-bootstrap';
import axios from 'axios';
import App from '../App';
import './Login.css';


function Login() {

    const [formName, setFormName] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [token, setToken] = useState(false);
   
    const config = {
        headers: { 
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        }
    };

    const adatokKuldese = async () => {
		try {
			const res = await axios.post('http://localhost:8000/api/login', {
                email: formName,
                password: formPassword,
                config 
            });
            
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("user", res.data.data.user.name);
            localStorage.setItem("userID", res.data.data.user.id);
            localStorage.setItem("iskolaID", res.data.data.user.iskola_id);
            localStorage.setItem("jog_iras", res.data.data.user.jog_iras);
            localStorage.setItem("jog_admin", res.data.data.user.jog_admin);
            localStorage.setItem("jog_ertekeles", res.data.data.user.jog_ertekeles);
            setToken (true)
            return token
            
		} catch (err) {
			console.log(err);
      alert("Rossz e-mail cím vagy jelszó.")
      //alert(err.response.data.message)
		}
	};
   
  return (
    token ? <><App /></> : 
    <div className='cimlap-hatter'>
      <Container>
        <Row className="text-center pt-5 pb-5">
        </Row>
        <Row>
          <Col lg={3} md={2}></Col>
          <Col lg={6} md={8} className="text-center">
           <Card pb={5}>
            <Card.Header>
              <h1>Oktatói Teljesítményértékelési Rendszer</h1>
            </Card.Header>
            <Card.Body>
              <img className="mb-3" src='http://localhost:3000/logo_otr.png'/>
              <h2 className="mb-3">Bejelentkezés</h2>
      
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>E-mail: </Form.Label>
                  <Form.Control type="text" placeholder="Írd be az e-mail címed!" value={formName} 
                    onChange={(e) => { setFormName(e.target.value)  
                    }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Jelszó: </Form.Label>
                  <Form.Control type="password" placeholder="Írd be a jelszót!" value={formPassword} 
                    onChange={(e) => { setFormPassword(e.target.value)  
                    }}/>
                </Form.Group>
                <Button onClick = {adatokKuldese}>Rendben</Button>
              </Form>
            </Card.Body>
          </Card>
            </Col>
          <Col lg={3} md={2}></Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login