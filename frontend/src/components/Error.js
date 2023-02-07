import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Error() {
    const navigate = useNavigate()
    const login = () => navigate('/Login')
  return (
    <div>Sorry we can’t log you in page<br/>
    <button onClick={login}>Go to Login Page</button>
    </div>
  )
}
