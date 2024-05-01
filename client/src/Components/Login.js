import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => {
    const Navigate = useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [hide,setHide]=useState(true)
    const handleClick = async(e) => {
        e.preventDefault();
        console.log(email,password)
        try {
          const response=await axios.post('http://localhost:8000/login',{email,password},{ withCredentials: true })
          console.log(response)
          Navigate('/profile')
        } catch (error) {
          console.log(error.message)
        }
    }

    useEffect(() => {
      const isAuthenticated = document.cookie.includes('jwt');
      if (isAuthenticated) {
        Navigate('/profile');
      }
    }, [])
    

  return (
    <div>
        <h2>Login</h2>
        <input type="email"
         placeholder='email'
         onChange={(e)=>setEmail(e.target.value)} />
        <input type={hide ? 'password' : 'text'} 
        placeholder='password' 
        onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={()=>setHide(!hide)}>{hide?'view':'hide'}</button>
        <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login