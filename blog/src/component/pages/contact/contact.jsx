import React, { useState } from 'react'
import img1 from "../../aserts/shake.svg"
// import emailjs from '@emailjs/browser'
import emailjs from 'emailjs-com';
import './contact.css'

const Contact = () => {
  const [Massage,setMassage]=useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault();
    setMassage(true);
    //alert("Submit");
    emailjs.sendForm('service_evlz4dp','template_s5eon5c',e.target,'iEltPWyvazWEbxFIf')
  }
  return (
    <div className='contact' id='Contact'>
      <div className="leftt">
        <img src={img1} alt="" />
      </div>
      <div className="rightt">
        <h2>Contact.</h2>
        <form onSubmit={handleSubmit}>
          <input className='classInput' type="email" placeholder='Email' name="email_from"/><br />
          <textarea className='classEra'placeholder='Massage'name='message' ></textarea><br />
          <button className='classButton' type='submit'>Send</button>
          {Massage &&<span>Thanks, I'll reply Soon</span>}
        </form>
      </div>
    </div>
  )
}
export default Contact
