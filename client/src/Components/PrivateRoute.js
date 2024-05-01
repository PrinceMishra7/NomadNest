import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({Component}) => {
   const Navigate=useNavigate();
   
   useEffect(() => {
    const isAuthenticated = document.cookie.includes('jwt');
    if (!isAuthenticated) {
      Navigate('/login');
    }
   }, [])
   
  return (
    <div>
      <Component/>
    </div>
  )
}

export default PrivateRoute