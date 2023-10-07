import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Register() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("auth/register", {
        username,
        email,
        password,
      });
      alert("Register New User  Seccusfylly")
      res.data && window.location.replace("/login") ; 
    } catch (error) {
      // alert(error);
      setError(true);
    }
  };
  return (
    <div className='register'>
       {error && <span className='error'>Somthing Went Wrong!</span>}
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text"
          className='registerInput'
          placeholder='Enter your username...'
          onChange={e => setUsername(e.target.value)}//use to get input and update at the time
        />
        <label>Email</label>
        <input type="email"
          className='registerInput'
          placeholder='Enter your email...'
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input type="password"
          className='registerInput'
          placeholder='Enter your Password...'
          onChange={e => setPassword(e.target.value)}
        />
        <button className="registerButton" type='submit'>Register</button>
      </form>
      <button className="registerLoginButton">
        <Link className="Link" to="/login">LOGIN</Link>
      </button>
     
    </div>
  )
}

export default Register
