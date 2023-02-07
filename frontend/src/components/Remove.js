import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Remove() {
    const navigate = useNavigate()
    const signup = () => navigate('/')
  return (
    <div>Remove<br/>Thank You
    <button onClick={signup}>Go to signup page</button>
    </div>
  )
}
