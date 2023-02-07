import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate()
    const login = () => navigate('/Login')

    const [credentials, setcredentials] = useState({name:"",email:"",password:""})

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(credentials.name === "" && credentials.email === "" && credentials.password === ""){
            alert("Enter the details")
        }
        else
        {
        const resp = await fetch('http://localhost:7000/v1/api/createUser',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})
        })
        let jsonx = resp.json();
        jsonx.then((data)=>{
            if(data.success === false){
                alert("Enter Valid Credentials") 
            }
            else{
                console.log("Account Created")
            }
        })
        navigate('/Login')
    }
    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div style={{width:'50%',margin:'auto', marginTop:'3vmax'}}>
        <form className='signupform' onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter your Name' name='name' value={credentials.name} onChange={onChange}/>
            <input type='email' placeholder='Enter your Email' name='email' value={credentials.email} onChange={onChange}/>
            <input type='password' name='password' placeholder='Enter the password' value={credentials.password} onChange={onChange}/>
            <div style={{textAlign:'center'}}>
            <button type='submit'>SignUp</button>
            <div className='buttonspace'></div>
            <button type='button' onClick={login}>Go to Login Page</button>
            </div>
        </form>
    </div>
    </>
  )
}
