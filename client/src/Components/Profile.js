import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Profile = () => {
  const [user,setUser]=useState({})
  const Navigate = useNavigate()
  const fetchUserData=async()=>{
    try {
      const response=await axios.get('http://localhost:8000/user',{ withCredentials: true })
      console.log(response.data)
      setUser(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleLogout = async() => {
    try {
      const response=await axios.get('http://localhost:8000/logout',{ withCredentials: true })
      console.log(response)
      Navigate('/login')
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    fetchUserData()
  }, [])
  return (
    <div>Profile
      <h1>{user.username}</h1>
      <h2>{user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div> 
  )
}

export default Profile