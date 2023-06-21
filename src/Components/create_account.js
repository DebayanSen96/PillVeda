import React from 'react'
import LOGO from './images/logo.png'
import { useNavigate } from 'react-router-dom'
import IMG from "./images/newImg.png"
function Create_account() {
    const navigate = useNavigate();
  return (
    <div className='main'>
    <img className='logo' src={LOGO} width="220px"/>
    <div className='circle'>
    <img src={IMG} width="305px"/>
    </div>
    <div className='text'>
        <h2>Create Your account</h2>
        <h5>NB: Only Registered Pharmacy Can Sell Medicines Online</h5>
    </div>
    
    <button className='btn1' onClick={()=>{navigate("/loginOptions")}}>NEXT</button>
    
    </div>
  )
}

export default Create_account