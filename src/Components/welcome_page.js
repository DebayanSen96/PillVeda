import React from 'react'
import './welcome_page.css'
import IMG from './images/page2.png'
import LOGO from './images/logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Welcome_page() {
    const navigate = useNavigate();
  return (
    <div className='main'>
    <img className='logo' src={LOGO} width="220px"/>
    <div className='circle'>
    <img src={IMG} width="450px"/>
    </div>
    <div className='text'>
        <h2>Welcome to PillVeda</h2>
        <h5>Let's start selling online</h5>
    </div>
    
    <button className='btn1' onClick={()=>{navigate("/account")}}>NEXT</button>
    
    </div>
  )
}

export default Welcome_page