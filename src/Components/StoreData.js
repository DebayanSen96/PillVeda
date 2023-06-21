import React, { useEffect, useState } from "react";
import IMG from "./images/logo.png";
import "./StoreData.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
function StoreData() {
  const [workDays,setWorkDays] = useState ({
    "monday":false,
    "tuesday":false,
    "wednesday":false,
    "thursday":false,
    "friday":false,
    "saturday":false,
    "sunday":false
  })
  const radioIds = ["radioId1", "radioId2", "radioId3", "radioId4", "radioId5", "radioId6", "radioId7"];
  const days =  ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday","sunday" ];
  const reset = {
    "monday": { open: false, from: "", to: "" },
    "tuesday": { open: false, from: "", to: "" },
    "wednesday": { open: false, from: "", to: "" },
    "thursday": { open: false, from: "", to: "" },
    "friday": { open: false, from: "", to: "" },
    "saturday": { open: false, from: "", to: "" },
    "sunday": { open: false, from: "", to: "" }
  }
  const navigate = useNavigate();
  const data = useContext(AppContext);
  const [selectedShopPhoto, setSelectedShopPhoto] = useState(null);
  const [selectedLicensePhoto, setSelectedLicensePhoto] = useState(null);
  const [gstNumber, setGstNumber] = useState("");
  const [workingHours, setworkingHours] = useState("");
  

  const handleShopPhotoChange = async (e) => {
    setSelectedShopPhoto(e.target.files[0]);
    setFileName1(e.target.files[0].name);
  };
  const handleLicensePhotoChange = async (e) => {
    setSelectedLicensePhoto(e.target.files[0]);
    setFileName2(e.target.files[0].name);
  };

  const submitHandler = () => {
    const temp = {
      ...data.user,
      shopPhoto: selectedShopPhoto,
      drugLicense: selectedLicensePhoto,
      gstNumber,
    };
    setFromTime();
    setToTime();
    console.log(data.user);
    data.setUser(temp);
    navigate("/final");
  };

  const handleSelect = (e) => {
  if(typeof(e)=="string"){
    let obj = {...workDays,[e]:true};
    data.user.schedule[e].open=true;
    data.setUser(data.user);
    setWorkDays(obj);
  }else{
  let curr = e.target.value;
   let obj = {...workDays,[curr]:true};
   data.user.schedule[e.target.value].open=true;
    data.setUser(data.user);
    setWorkDays(obj);
  }
}
  const handleReset = () => {
    let obj = {...workDays};
    Object.keys(obj).forEach((keys)=>{
      obj[keys]=false;
    })
    setWorkDays(obj);
    radioIds.forEach((inputId) => {
      const radioInput = document.getElementById(inputId);
      if (radioInput) {
        radioInput.checked = false;
      }
    });
    let temp = {...data.user,schedule:reset};
    data.setUser(temp);
    const to = document.getElementById("to");
    const from = document.getElementById("from");

    const inputsFrom = to.querySelectorAll('.input_from');
    
    const inputsTo = from.querySelectorAll('.input_from');
    for (let i = 0; i < inputsFrom.length; i++) {
      inputsFrom[i].value="";
      
    }
    for (let i = 0; i < inputsTo.length; i++) {
      inputsTo[i].value="";
      
    }
  }

  const setFromTime = () => {
    const form = document.getElementById("from");
    const inputs = form.querySelectorAll('.input_from');
  
    for (let i = 0; i < inputs.length; i++) {
      let day = days[i];
      data.user.schedule[day].from=inputs[i].value;
      
    }
  }

  const setToTime = () => {
    const form = document.getElementById("to");
    const inputs = form.querySelectorAll('.input_from');
  
    for (let i = 0; i < inputs.length; i++) {
      let day = days[i];
      data.user.schedule[day].to=inputs[i].value;
      
    }
  }

  const [fileNAme1, setFileName1] = useState("");
  const [fileNAme2, setFileName2] = useState("");

  return (
    <div className="store_div">
      <img src={IMG} className="logo" />
      <div className="form form2">
        <h2 className="store_headder">Store Details</h2>
        <div className="store_text">
          <h5>Enter GST Number(Optional)</h5>
          <input
            className="input store_input"
            onChange={(e) => {
              setGstNumber(e.target.value);
            }}
            placeholder=" Enter GST Number"
          />
        </div>
        <div className="divider" />
        <div className="file_main_div">
          <div className="file_text">
            <h5>Store Photograph with Shop Board</h5>
            <h6>{`${fileNAme1}`}</h6>
          </div>
          <div className="input_div">
            <button className="input_btn">
              {fileNAme1 == "" ? <h6>choose</h6> : <h6>change</h6>}
            </button>
            <input
              className="input_file"
              type="file"
              onChange={handleShopPhotoChange}
            />
          </div>
        </div>
        <div className="file_main_div">
          <div className="file_text">
            <h5>Upload Drug License</h5>
            <h6>{`${fileNAme2}`}</h6>
          </div>
          <div className="input_div">
            <button className="input_btn">
              {fileNAme2 == "" ? <h6>choose</h6> : <h6>change</h6>}
            </button>
            <input
              className="input_file"
              type="file"
              onChange={handleLicensePhotoChange}
            />
          </div>
        </div>
        <div className="store_text">
          <h5>Enter Store Schedule</h5>
          {/*<input
            placeholder="Eg. 10AM - 6PM"
            onChange={(e) => {
              setworkingHours(e.target.value);
            }}
            className="input"
          />*/}
          <div className="header_time">
            <h6 className="workDays">Select Work Days</h6>
            <h6 className="textFrom">From</h6>
            <h6 className="textTo">To</h6>
          </div>
          <div className="main_working_hours">
            <div className="radio_div">
              <div className="radio">
                <input id="radioId1" onChange={handleSelect} type="radio" name="Monday" value="monday" />
                <h6 onClick={(e)=>{document.getElementById(radioIds[0]).checked=true;handleSelect("monday")}}>Monday</h6>
              </div>
              <div className="radio">
                <input id="radioId2" onChange={handleSelect} type="radio" name="Tuesday" value="tuesday" />
                <h6 onClick={()=>{document.getElementById(radioIds[1]).checked=true;handleSelect("tuesday")}}>Tuesday</h6>
              </div>

              <div className="radio">
                <input id="radioId3" type="radio" onChange={handleSelect} name="Wednesday" value="wednesday" />
                <h6 onClick={()=>{document.getElementById(radioIds[2]).checked=true;handleSelect("wednesday")}}>Wednesday</h6>
              </div>
              <div className="radio">
                <input id="radioId4" type="radio" onChange={handleSelect} name="Thursday" value="thursday" />
                <h6 onClick={()=>{document.getElementById(radioIds[3]).checked=true;handleSelect("thursday")}}>Thursday</h6>
              </div>
              <div className="radio">
                <input id="radioId5" type="radio" onChange={handleSelect} name="Friday" value="friday" />
                <h6 onClick={()=>{document.getElementById(radioIds[4]).checked=true;handleSelect("friday")}}>Friday</h6>
              </div>
              <div className="radio">
                <input id="radioId6" type="radio" onChange={handleSelect} name="Saturday" value="saturday" />
                <h6 onClick={()=>{document.getElementById(radioIds[5]).checked=true;handleSelect("saturday")}}>Saturday</h6>
              </div>
              <div className="radio">
                <input id="radioId7" type="radio" onChange={handleSelect} name="Sunday" value="sunday" />
                <h6 onClick={()=>{document.getElementById(radioIds[6]).checked=true;handleSelect("sunday")}}>Sunday</h6>
              </div>
            </div>
           
            <div className="input_container">
              <form className="inputs" id="from">
                <input disabled={!workDays["monday"]} className="input_from" />
                <input disabled={!workDays["tuesday"]} className="input_from"/>
                <input disabled={!workDays["wednesday"]} className="input_from"/>
                <input disabled={!workDays["thursday"]} className="input_from"/>
                <input disabled={!workDays["friday"]} className="input_from"/>
                <input disabled={!workDays["saturday"]} className="input_from"/>
                <input disabled={!workDays["sunday"]} className="input_from"/>
              </form>
              <form className="inputs" id="to">
                <input disabled={!workDays["monday"]} className="input_from"/>
                <input disabled={!workDays["tuesday"]} className="input_from"/>
                <input disabled={!workDays["wednesday"]} className="input_from"/>
                <input disabled={!workDays["thursday"]} className="input_from"/>
                <input disabled={!workDays["friday"]} className="input_from"/>
                <input disabled={!workDays["saturday"]} className="input_from"/>
                <input disabled={!workDays["sunday"]} className="input_from"/>
              </form>
              
            </div>
            
          </div>
        </div>
      </div>
      <button className="btn1 btnReset" onClick={handleReset}>Reset</button>
      <button className="btn1 btn_file" onClick={submitHandler}>
        Continue
      </button>
    </div>
  );
}

export default StoreData;
