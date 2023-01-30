import axios from 'axios';
import { Navigate } from 'react-router-dom';




function Logout() {
	
	const token = localStorage.getItem("token")
  
  const Kilepes = () => {
    var config = {
      method: 'post',
      url: 'http://localhost:8000/api/logout',
      headers: { 
        'Accept': 'application/vnd.api+json', 
        'Content-Type': 'application/vnd.api+json', 
        'Authorization': 'Bearer '+token
      }
    };
    axios(config)
      .then(function (response) {
        localStorage.clear();
        console.log(JSON.stringify(response.data));
        window.location.href = '/';
      })
      .catch(function (error) {
        localStorage.clear();
        console.log(error);
        alert(error.message)
    });
  }

    
  return (
    token ?
      <>
        {Kilepes()}
      </>

      : <Navigate to="../" />
  )
}

export default Logout