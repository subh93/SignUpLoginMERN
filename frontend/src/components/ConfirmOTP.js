import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default function ConfirmOTP() {
    const navigate = useNavigate()
    const signup = () => navigate('/')

    const [credentials, setcredentials] = useState({ otp: "", authToken: "" })
    const authTokenValue = localStorage.getItem('authToken')
    let decoded = jwt_decode(localStorage.getItem('authToken'));
                console.log(decoded);
                console.log(decoded.accountdetails._id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await fetch('http://localhost:7000/v1/api/otpmatch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp: credentials.otp, authToken: authTokenValue })
        })
        let jsonx = resp.json();
        jsonx.then((data) => {
            if (data.success === false) {
                alert("Enter the Correct OTP")
            }
        })

        console.log("The decoded2 is " + decoded.accountdetails._id)
        const resp2 = await fetch('http://localhost:7000/v1/api/getthename', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: decoded.accountdetails._id })
        })
        let json2 = resp2.json();
        json2.then(data => {
            console.log(data)
            navigate('/Welcome', { state: { id: decoded.accountdetails._id, name: data.message } })
        })
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div style={{ width: '50%', margin: 'auto', marginTop:'3vmax' }}>
            <form className='otpform' onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter your OTP' name='otp' value={credentials.otp} onChange={onChange} />
                <div style={{ textAlign: 'center' }}>
                    <button type='submit'>Confirm</button>
                    <div className='buttonspace'></div>
                    <button type='button' onClick={signup}>Go to SignUp Page</button>
                </div>
            </form>
        </div>
    )
}
