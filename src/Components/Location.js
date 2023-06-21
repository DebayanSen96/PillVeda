import React, { useState } from "react";
import IMG from "./images/background.svg";
import "./Location.css";
import { AppContext } from "../App";
import { useContext } from "react";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";


function Location() {
  const [show,setShow] = useState(false);
  const [address,setAddress] = useState({
    line1:"",
    line2:"",
    city:"",
    state:"",
    pincode:"",
    country:""
  })
  const delay = ms => new Promise(res => setTimeout(res, ms));
 
  const scrollToHeight = async() => {
    const scrollHeight = 500; // Adjust this value to the desired scroll height
    await delay(500);
    window.scrollTo(0, scrollHeight);
  };
  



  const navigate = useNavigate();
  const location_Handler = () => {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
    navigator.geolocation.getCurrentPosition(function(position) {
      var temp = {
        location : {
          latitude:position.coords.latitude,
          longitude: position.coords.longitude,
        }
      };
      
      data.setUser(temp);
      navigate("/storeData");
    });
  }

  const submitHandler = () =>{
    var temp = {...data.user,location:{...data.user.location,address}};
    data.setUser(temp);
    navigate("/storeData")
  }
  const data = useContext(AppContext);
  return (
    <div className="location_Background">
      <img className="upper_Background" src={IMG}/>
      <div className="bottom_text">
        <h1>{`Hi ${data.user.storeName},`}</h1>
        <h1>nice to meet you</h1>
        <h4>Choose you location so that customers can find your store.</h4>
        {!show&&<button onClick={location_Handler} className="btn1 location_btn"><FontAwesomeIcon icon={faLocationArrow} /> Use Current Location</button>}
      </div>
      {!show&&<button className="manual_location_btn" onClick={()=>{setShow(true);scrollToHeight()}}>
        Enter Location Manualy
      </button>}

      {show&&<div className="location_inputs">
        <div className="buisness_header"> <h6> Buisness Address Details </h6> <button onClick={()=> {setShow(false)}}>Cancel</button></div>
       
        <input onChange={(e)=>{setAddress({...address,line1:e.target.value})}} placeholder="Address line 1" className="location_input"/>
        <input onChange={(e)=>{setAddress({...address,line2:e.target.value})}} placeholder="Address line 2" className="location_input"/>
        <input onChange={(e)=>{setAddress({...address,city:e.target.value})}} placeholder="City/Town name" className="location_input"/>
        <input onChange={(e)=>{setAddress({...address,state:e.target.value})}} placeholder="State name" className="location_input"/>
        <input onChange={(e)=>{setAddress({...address,pincode:e.target.value})}} placeholder="Pin Code" type="number" className="location_input"/>
        <div className="last_input">
          <div className="country_background">
          <h6>Country Name</h6>
          </div>
        <input onChange={(e)=>{setAddress({...address,country:e.target.value})}} placeholder="India" className="location_input"/>
        </div>
        <button id="end" onClick={submitHandler} className="btn1 btn_new">Continue</button>
      </div>
      }
    </div>
  );
}

export default Location;
