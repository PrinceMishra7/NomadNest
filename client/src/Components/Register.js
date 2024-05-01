import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MapboxAutocomplete from "react-mapbox-autocomplete";
const Register = () => {
    const accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    const Navigate = useNavigate()
    const [user,setUser]=useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        locationText:'',
        latitude:'',
        longitude:'',
    })
    const [hide,setHide]=useState(true)
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(user)
        try {
          const response=await axios.post('http://localhost:8000/register',user)
          console.log(response)
          Navigate('/login')
        } catch (error) {
          console.log(error.message)
        }
        
    }
    function _suggestionSelect(result, lat, long, text) {
      console.log(result, lat, long, text);
      setUser({...user,locationText:text,latitude:lat,longitude:long})
    }

  return (
    <div>
        <h1>Register</h1>
        <input type="text"
         placeholder='first name'
         onChange={(e)=>setUser({...user,firstName:e.target.value})} />
        <input type="text"
         placeholder='last name'
         onChange={(e)=>setUser({...user,lastName:e.target.value})} />
        <input type="email" 
        placeholder='email'
        onChange={(e)=>setUser({...user,email:e.target.value})} />
        <input type={hide ? 'password' : 'text'} 
        placeholder='password' 
        onChange={(e)=>setUser({...user,password:e.target.value})}/>
        <button onClick={()=>setHide(!hide)}>{hide?'view':'hide'}</button>
        <MapboxAutocomplete
          publicKey={accessToken}
          inputClass="form-control search"
          onSuggestionSelect={_suggestionSelect}
          resetSearch={false}
          placeholder="Search Address..."
        />
        <button onClick={handleSubmit}>Register</button>
    </div>
  )
}

export default Register