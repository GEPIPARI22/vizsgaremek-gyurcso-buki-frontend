import {useState, useEffect} from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';
import {useParams, useLocation, useNavigate} from 'react-router-dom'

function Edit() {

  let { index } = useParams();
  const {state} = useLocation();
  const { oktatoID, szempontsorID, idopont, 
    terulet1, terulet2, terulet3, terulet4, terulet5, terulet6, terulet7, terulet8, terulet9, terulet10,  
    lezarva } = state || {};
    const [formOktatoID, setFormOktatoID] = useState(state.oktatoID);
    const [formSzempontsorID, setFormSzempontsorID] = useState(state.szempontsorID);
    const [formIdopont, setFormIdopont] = useState(state.idopont);
    const [formTerulet1, setFormTerulet1] = useState(state.terulet1);
    const [formTerulet2, setFormTerulet2] = useState(state.terulet2);
    const [formTerulet3, setFormTerulet3] = useState(state.terulet3);
    const [formTerulet4, setFormTerulet4] = useState(state.terulet4);
    const [formTerulet5, setFormTerulet5] = useState(state.terulet5);
    const [formTerulet6, setFormTerulet6] = useState(state.terulet6);
    const [formTerulet7, setFormTerulet7] = useState(state.terulet7);
    const [formTerulet8, setFormTerulet8] = useState(state.terulet8);
    const [formTerulet9, setFormTerulet9] = useState(state.terulet9);
    const [formTerulet10, setFormTerulet10] = useState(state.terulet10);
    const [formLezarva, setFormLezarva] = useState(state.lezarva);

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const [oktatok, setOktatok] = useState([]);
    const oktatokLekerese = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/oktato', {
          headers: { 
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${token}`
          }
        });
        //console.log(res.data.data)
        setOktatok(res.data.data);
        return
      } catch (err) {
        alert(err.response.data.message);
      }
    };
    const arrOktatok = oktatok.map((data) => {
      return (
        <option key={data.id} value={data.id} selected={data.id === formOktatoID}>
          {data.vezeteknev} {data.keresztnev} {data.om_azonosito}</option>
      )
    })

    const [szempontsor, setSzempontsor] = useState([]);
    const szempontsorLekerese = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/szempontsor', {
          headers: { 
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${token}`
          }
        });
        setSzempontsor(res.data.data);
      } catch (err) {
        alert(err);
      }
    };
    const arrSzempontsor = szempontsor.map((data) => {
      return (
        <option key={data.id} value={data.id} selected={data.id === formSzempontsorID}>
          {data.megnevezes}</option>
      )
    })

    const [szempontok, setSzempontok] = useState([]);
    const szempontokLekerese =  async () => {
      try {
        const res =  await axios.get('http://localhost:8000/api/szempont/szempontsor/'+formSzempontsorID, {
          headers: { 
            'Content-type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json',
            'Authorization': `Bearer ${token}`
          }
        });
        //console.log(res.data.data)
        setSzempontok(res.data.data);
      } catch (err) {
        alert(err + " - Szempontsor ID: " + formSzempontsorID);
      }
    };
    
    const arrSzempontok = szempontok.map((data) => {
      return (
        <span>{data.terulet}</span>
      )
    })
    const arrSzempontokTeljes = szempontok.map((data) => {
      return (
        <>
          <p>{data.terulet}</p>
          <p>{data.szempont}</p>
          <p>{data.magyarazat}</p>
          <p>{data.adatforras}</p>
          <p>{data.kapcsolodo}</p>
        </>
        
      )
    })

    useEffect(() => {
      oktatokLekerese()
      szempontsorLekerese()
      //szempontokLekerese()
    }, []);

    useEffect(() => {
      szempontokLekerese()
    }, [formSzempontsorID]);

    const handleOnChangeLezarva = () => {
      setFormLezarva(!formLezarva)
    };

    const adatokKuldese = () => {
      var config = {
        method: 'patch',
        url: 'http://localhost:8000/api/ertekeles/'+index,
        headers: { 
          'Accept': 'application/vnd.api+json', 
          'Content-Type': 'application/vnd.api+json', 
          'Authorization': 'Bearer '+token
        },
        data: {
          'oktato_id': formOktatoID,
          'szempontsor_id': formSzempontsorID,
          'idopont': formIdopont,
          'terulet1': formTerulet1,
          'terulet2': formTerulet2,
          'terulet3': formTerulet3,
          'terulet4': formTerulet4,
          'terulet5': formTerulet5,
          'terulet6': formTerulet6,
          'terulet7': formTerulet7,
          'terulet8': formTerulet8,
          'terulet9': formTerulet9,
          'terulet10': formTerulet10,
          'lezarva': formLezarva
        }
      };
      axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        navigate("../ertekelesek")
      })
      .catch(function (error) {
        //console.log(error);
        alert(error.response.data.message)
      });
    };

  return (
    <>
    <h1>Az értékelés szerkesztése</h1>
   
    <Row pt={5}>
      <Col lg="6">
        <Form>
          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => { setFormOktatoID(e.target.value) }}>
              <option value='0'>Válassz ki az oktatót!</option>
              {arrOktatok}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => { setFormSzempontsorID(e.target.value)}}>
              <option value='0'>Válaszd ki a szempontsort!</option>
              {arrSzempontsor}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Időpont: </Form.Label>
            <Form.Control type="text" placeholder="Időpont" value={formIdopont} 
              onChange={(e) => { setFormIdopont(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>1. {arrSzempontok[0]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet1} 
              onChange={(e) => { setFormTerulet1(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>2. {arrSzempontok[1]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet2} 
              onChange={(e) => { setFormTerulet2(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>3. {arrSzempontok[2]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet3} 
              onChange={(e) => { setFormTerulet3(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>4. {arrSzempontok[3]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet4} 
              onChange={(e) => { setFormTerulet4(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>5. {arrSzempontok[4]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet5} 
              onChange={(e) => { setFormTerulet5(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>6. {arrSzempontok[5]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet6} 
              onChange={(e) => { setFormTerulet6(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>7. {arrSzempontok[6]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet7} 
              onChange={(e) => { setFormTerulet7(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>8. {arrSzempontok[7]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet8} 
              onChange={(e) => { setFormTerulet8(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>9. {arrSzempontok[8]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet9} 
              onChange={(e) => { setFormTerulet9(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>10. {arrSzempontok[9]}</Form.Label>
            <Form.Control type="text" placeholder="pontszám" value={formTerulet10} 
              onChange={(e) => { setFormTerulet10(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lezárva</Form.Label>
            <Form.Control type="text" placeholder="Lezárva" value={formLezarva} 
              onChange={(e) => { setFormLezarva(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check id="irasiJog" type="switch" label="Lezárva"
              checked={formLezarva}
              onChange={handleOnChangeLezarva}
            />

          </Form.Group> 

          <Button onClick = {adatokKuldese}>Adatok küldése</Button>
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default Edit