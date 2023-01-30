import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

function New() {
    
    const [formName, setFormName] = useState('');
    const [formEmail, setFormEmail] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [formPasswordConfirmation, setFormPasswordConfirmation] = useState('');
    const [formVezeteknev, setFormVezeteknev] = useState('');
    const [formKeresztnev, setFormKeresztnev] = useState('');
    const [formIskolaID, setFormIskolaID] = useState('');
    const [formMunkakorID, setFormMunkakorID] = useState('');
    const [formJogIras, setFormJogIras] = useState(false);
    const [formJogErtekeles, setFormJogErtekeles] = useState(false);
    const [formJogAdmin, setFormJogAdmin] = useState(false);

    const [iskolak, setIskolak] = useState([]);
    const [munkakorok, setMunkakorok] = useState([]);
    
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

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
        <option key={data.id} value={data.id} selected={data.id == formIskolaID}>
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
      } catch (error) {
        console.log(error)
        alert(error.response.data.message);
      }
    };

    const arrMunkakorok = munkakorok.map((data, index) => {
      return (
        <option key={data.id} value={data.id} selected={data.id == formMunkakorID}>
          {data.munkakor}</option>
      )
    })

    useEffect(() => {
      iskolakLekerese()
      munkakorokLekerese()
    }, []);

    const handleOnChangeIrasiJog = () => {
      setFormJogIras(!formJogIras)
    };

    const handleOnChangeErtekelesiJog = () => {
      setFormJogErtekeles(!formJogErtekeles)
    };

    const handleOnChangeAdminJog = () => {
      setFormJogAdmin(!formJogAdmin)
    };
    
    const adatokKuldese = () => {
      var config = {
        method: 'post',
        url: 'http://localhost:8000/api/register',
        headers: { 
          'Accept': 'application/vnd.api+json', 
          'Content-Type': 'application/vnd.api+json', 
          'Authorization': 'Bearer '+token
        },
        data: {
          'name': formName,
          'email': formEmail,
          'password': formPassword,
          'password_confirmation': formPasswordConfirmation,
          'vezeteknev': formVezeteknev,
          'keresztnev': formKeresztnev,
          'iskola_id': formIskolaID,
          'munkakor_id': formMunkakorID,
          'jog_iras': formJogIras,
          'jog_ertekeles': formJogErtekeles,
          'jog_admin': formJogAdmin
        }
      };
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        navigate('../users')
      })
      .catch(function (error) {
        //console.log(error);
        alert(error.status)
      });
    };

  return (
    <>
    <h1>Új felhasználó regisztrálása</h1>
    <Row pt={5}>
      <Col lg="6">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Felhasználónév: </Form.Label>
            <Form.Control type="text" placeholder="Felhasználónév" value={formName} 
              onChange={(e) => { setFormName(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>E-mail: </Form.Label>
            <Form.Control type="text" placeholder="E-mail cím" value={formEmail} 
              onChange={(e) => { setFormEmail(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Jelszó: </Form.Label>
            <Form.Control type="password" placeholder="Jelszó" value={formPassword} 
              onChange={(e) => { setFormPassword(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Jelszó megerősítése: </Form.Label>
            <Form.Control type="password" placeholder="Írd be a jelszót még egyszer!" value={formPasswordConfirmation} 
              onChange={(e) => { setFormPasswordConfirmation(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Vezetéknév: </Form.Label>
            <Form.Control type="text" placeholder="Vezetéknév" value={formVezeteknev} 
              onChange={(e) => { setFormVezeteknev(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Keresztnév: </Form.Label>
            <Form.Control type="text" placeholder="Keresztnév" value={formKeresztnev} 
              onChange={(e) => { setFormKeresztnev(e.target.value) }}/>
          </Form.Group>

         {/*  <Form.Group className="mb-4">
            <Form.Label>Iskola: </Form.Label>
            <Form.Control type="text" placeholder="Iskola" value={formIskolaID} 
              onChange={(e) => { setFormIskolaID(e.target.value) }}/>
          </Form.Group> */}

          {/* <Form.Group className="mb-3">
            <Form.Label>Munkakör: </Form.Label>
            <Form.Control type="text" placeholder="Munkakör" value={formMunkakorID} 
              onChange={(e) => { setFormMunkakorID(e.target.value) }}/>
          </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => { setFormIskolaID(e.target.value) }}>
              <option value='0'>Válassz ki egy iskolát!</option>
              {arrIskolak}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => { setFormMunkakorID(e.target.value) }}>
              <option value='0'>Válassz ki egy munkakört!</option>
              {arrMunkakorok}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check id="irasiJog" type="switch" label="Írási jogosultság"
              checked={formJogIras}
              onChange={handleOnChangeIrasiJog}
            />
            <Form.Check id="ertekelesiJog" type="switch" label="Értékelési jogosultság"
              checked={formJogErtekeles}
              onChange={handleOnChangeErtekelesiJog}
            />
            <Form.Check id="adminJog" type="switch" label="Adminisztrációs jogosultság"
              checked={formJogAdmin}
              onChange={handleOnChangeAdminJog}
            />
          </Form.Group>          

          <Button onClick = {adatokKuldese}>Adatok küldése</Button>
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default New