import axios from "axios";
import {useParams, useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'

function Delete() {
  let { index } = useParams();
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  
  const elemTorlese = () => {
    var config = {
      method: 'delete',
      url: 'http://localhost:8000/api/iskola/'+index,
      headers: { 
        'Accept': 'application/vnd.api+json', 
        'Content-Type': 'application/vnd.api+json', 
        'Authorization': 'Bearer '+token
      }
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      navigate('../iskolak')
      return
    })
    .catch(function (error) {
        //console.log(error);
        alert(error.response.data.message)    })
  }

  const vissza = () => {
    navigate("../iskolak")
  }

  return (
    <div className="text-center">
        <h1>Biztos?</h1>
        <Button variant='info' onClick={elemTorlese}>Igen</Button>
        <Button className="ms-3" variant='danger' onClick={vissza}>Nem</Button>
    </div>
  )
}

export default Delete