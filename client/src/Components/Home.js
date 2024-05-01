import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const Navigate = useNavigate()
  return (
    <div>
        <h1>Home page</h1>
        <button onClick={()=>Navigate('/login')}>Login</button>
        <button onClick={()=>Navigate('/register')}>Register</button>
    </div>
  )
}

export default Home