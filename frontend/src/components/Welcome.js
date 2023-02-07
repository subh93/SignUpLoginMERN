import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


export default function Welcome() {
  const location = useLocation()
  const navigate = useNavigate()
  const logoutuser = ()=>{
    localStorage.removeItem("authToken");
    navigate('/');
  }

  const deleteaccount = async()=>{
        const resp = await fetch('http://localhost:7000/v1/api/removeaccount', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: location.state.id, name: location.state.name })
        })
        let json = resp.json();
        json.then(data => {
            console.log(data)
            localStorage.removeItem("authToken");
            navigate('/')
        })
  }
    
  return (
    <>
    <div style={{width:'50%',margin:'auto', marginTop:'3vmax'}}><h2 style={{textAlign:'center'}}>Thank you for Logging In, {location.state.name}</h2>
    <div style={{textAlign:'center'}}>
    <button onClick={logoutuser}>LogOut</button>
    <div className='buttonspace'></div>
    <button onClick={deleteaccount}>Remove Account</button>
    </div>
    </div>
    </>
  )
}
