import React from 'react'
import img1 from '../aserts/blog.jpg'
import './header.css'
const Header = () => {
  return (
    <div className='header'>
      <div className="headerTitels">
        {/* <span className="headerTitelssm">React & Node</span> */}
        <span className="headerTitelslg">Blog</span>
      </div>
      <img className='headerImg' src={img1} alt="" />
    </div>
  )
}

export default Header
