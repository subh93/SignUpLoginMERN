import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate()
    const signup = () => navigate('/')

    const [credentials, setcredentials] = useState({email:"",password:""})
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(credentials.email === "" && credentials.password === ""){
            alert("Enter the details")
        }
        else
        {
        const resp = await fetch('http://localhost:7000/v1/api/loginUser',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        })
        let jsonx = resp.json();
        jsonx.then((data)=>{
            if(!data.success){ 
                navigate('/Error')
            }
            else{
                localStorage.setItem('authToken', data.authToken);
                navigate('/ConfirmOTP')
            }
        })
        }
    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div style={{width:'50%',margin:'auto', marginTop:'3vmax'}}>
        <form className='loginform' onSubmit={handleSubmit}>
            <input type='email' placeholder='Enter your Email' name='email' value={credentials.email} onChange={onChange}/>
            <input type='password' name='password' placeholder='Enter the password' value={credentials.password} onChange={onChange}/>
            <div style={{textAlign:'center'}}>
            <button type='submit'>Login</button>
            <div className='buttonspace'></div>
            <button type='button' onClick={signup}>Go to SignUp Page</button>
            </div>
        </form>
    </div>
  )
}
