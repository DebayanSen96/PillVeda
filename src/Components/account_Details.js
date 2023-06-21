import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./account_Details.css";
import LOGO from "./images/logo.png";
import PhoneInput from "react-phone-input-2";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useContext } from "react";
import { AppContext } from "../App";

import { Link } from "react-router-dom";
function Account_Details() {

  var data = useContext(AppContext);


  const [phone, setPhone] = useState("");
  const [storeName, setStoreName] = useState("");
  
  const navigate = useNavigate();



  

  const submitHandler = (res) => {

    let obj = {...data.user,phone,storeName};
    data.setUser(obj);
    navigate("/otp")
  }

    

  return (
    <div className="main_container">
      <img className="logo" src={LOGO} />
      <h3>Create Your Account</h3>
      
      
        
          <div className="form">
              {<div className="first_input">
                <h4 className="top_text">Enter Phone Number</h4>
                <PhoneInput
                  containerStyle={{ margin: "0 0 10px 0" }}
                  inputClass="input phone_input"
                  country={"in"}
                  className="marginBottom"
                  value={phone}
                  onChange={setPhone}
                />
              </div>}
            

            
              {/*<div className="first_input">
                <h4 className="top_text">Create Password</h4>
                <InputGroup className="mb-3" size="sm">
                  <Form.Control
                    id="form-control"
                    aria-label="Text input with dropdown button"
                    placeholder="Create Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </InputGroup>
                  </div>*/}
            
            <div className="first_input">
              <h4 className="top_text">Enter Store Name</h4>
              <InputGroup className="mb-3" size="sm">
                <Form.Control
                  id="form-control"
                  aria-label="Text input with dropdown button"
                  placeholder="Enter Store Name"
                  onChange={(e) => {
                    setStoreName(e.target.value);
                  }}
                />
              </InputGroup>
            </div>
          </div>
          <button className="btn1 btn_input" onClick={submitHandler}>
            Continue
          </button>

          <div className="divider_container">
            <div className="grey_line" />
            <div className="or_border">
              <h4>OR</h4>
            </div>
          </div>
          <div className="bottom__text">
        <h6>Already have and account?</h6>
        <Link style={{ textDecoration: "none" }}>
          <h5>LOG IN</h5>
        </Link>
      </div>
      
     
    </div>
  );
}

export default Account_Details;
