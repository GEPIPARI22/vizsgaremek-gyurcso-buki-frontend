import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap';
import axios from 'axios';

function New() {
  
    const [formOktatoID, setFormOktatoID] = useState('');
    const [formSzempontsorID, setFormSzempontsorID] = useState('1');
    const [formIdopont, setFormIdopont] = useState('');
    const [formTerulet1, setFormTerulet1] = useState('');
    const [formTerulet2, setFormTerulet2] = useState('');
    const [formTerulet3, setFormTerulet3] = useState('');
    const [formTerulet4, setFormTerulet4] = useState('');
    const [formTerulet5, setFormTerulet5] = useState('');
    const [formTerulet6, setFormTerulet6] = useState('');
    const [formTerulet7, setFormTerulet7] = useState('');
    const [formTerulet8, setFormTerulet8] = useState('');
    const [formTerulet9, setFormTerulet9] = useState('');
    const [formTerulet10, setFormTerulet10] = useState('');
    const [formLezarva, setFormLezarva] = useState(false);
    
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
        console.log(err)
        alert(err.message);
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
        method: 'post',
        url: 'http://localhost:8000/api/ertekeles',
        headers: { 
          'Accept': 'application/vnd.api+json', 
          'Content-Type': 'application/vnd.api+json', 
          'Authorization': 'Bearer '+token,
          locale:'hu'
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
        navigate('../ertekelesek')
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.message)      });
    };

  return (
    <>
    <h1>??j ??rt??kel??s r??gz??t??se</h1>
    <Row pt={5}>
      <Col lg="6">
        <Form>

          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => { setFormOktatoID(e.target.value) }}>
              <option value='0'>V??lassz ki az oktat??t!</option>
              {arrOktatok}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => { setFormSzempontsorID(e.target.value)}}>
              <option value='0'>V??laszd ki a szempontsort!</option>
              {arrSzempontsor}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Id??pont: </Form.Label>
            <Form.Control type="text" placeholder="Id??pont" value={formIdopont} 
              onChange={(e) => { setFormIdopont(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>1. {arrSzempontok[0]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet1} 
              onChange={(e) => { setFormTerulet1(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>2. {arrSzempontok[1]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet2} 
              onChange={(e) => { setFormTerulet2(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>3. {arrSzempontok[2]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet3} 
              onChange={(e) => { setFormTerulet3(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>4. {arrSzempontok[3]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet4} 
              onChange={(e) => { setFormTerulet4(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>5. {arrSzempontok[4]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet5} 
              onChange={(e) => { setFormTerulet5(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>6. {arrSzempontok[5]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet6} 
              onChange={(e) => { setFormTerulet6(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>7. {arrSzempontok[6]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet7} 
              onChange={(e) => { setFormTerulet7(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>8. {arrSzempontok[7]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet8} 
              onChange={(e) => { setFormTerulet8(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>9. {arrSzempontok[8]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet9} 
              onChange={(e) => { setFormTerulet9(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>10. {arrSzempontok[9]}</Form.Label>
            <Form.Control type="text" placeholder="pontsz??m" value={formTerulet10} 
              onChange={(e) => { setFormTerulet10(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lez??rva</Form.Label>
            <Form.Control type="text" placeholder="Lez??rva" value={formLezarva} 
              onChange={(e) => { setFormLezarva(e.target.value) }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check id="irasiJog" type="switch" label="Lez??rva"
              checked={formLezarva}
              onChange={handleOnChangeLezarva}
            />

          </Form.Group> 

          <Button onClick = {adatokKuldese}>Adatok k??ld??se</Button>
        </Form>
      </Col>
    </Row>
    </>
  )
}

export default New