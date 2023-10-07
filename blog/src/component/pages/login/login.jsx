import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Context } from '../../../context/Context';
import './login.css'
import axios from 'axios';
function Login() {

  const userRef=useRef();//useRef hooks is use to get data from from
  const passwordRef=useRef();

  const {dispatch , isFecthing}=useContext(Context)
  const [error,setError]=useState(false);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError(false);
    dispatch({type:"LOGIN_START"});
    try {
      
      const res=await axios.post("auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    } catch (err) {
      setError(true);
      dispatch({type:"LOGIN_FAILURE "});
     
    }
  };
  console.log(isFecthing);
  return (
    <div className='login'>
      {error && <span className='error'>Invalid User and Password!</span>}
        <span className="loginTitle">Login</span>
      <form  className="logginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text"
         className='loginInput'
          placeholder='Enter your username...' 
          ref={userRef}
          />
        <label>Password</label>
        <input type="password"  
        className='loginInput'
         placeholder='Enter your Password...'
         ref={passwordRef}
         />
        <button className="loginButton" type="submit" disabled={isFecthing}>Login</button>

      </form>
      <button className="loginRegisterButton">
        <Link className="Link" to="/register">REGISTER</Link >
      </button>
    </div>
  )
}

export default Login
