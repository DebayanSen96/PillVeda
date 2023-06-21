import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import LOGO from "./images/logo.png";
import "./otp.css";
import OtpInput from "react-otp-input";
function Otp() {
  const data = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [captcha,showCaptcha] = useState(true);
  const navigate = useNavigate();
  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
       window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          'callback': (response) => {
          },
          "expired-callback": () => {
            console.log('error');
          },
        },
        auth
      );
    }
  }

  useEffect(() => {
    onSignup();
  }, []);

  function onSignup() {

    onCaptchVerify();
    ;
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + data.user.phone;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

        console.log("OTP sent successfully!");
        showCaptcha(false);
      })
      .catch((error) => {
        console.log(error);
        showCaptcha(true);
      });
  }

 

  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        navigate("/location")
        console.log(res);
      })
      .catch((err) => {
        console.log('error');
        showCaptcha(true);
      });
  }

  return (
    
    <div className="main otp_page">
      <img src={LOGO} className="logo" />
      <h3>Enter OTP</h3>
      <h5 className="small_text">Enter the 6 digit otp that was sent to</h5>
      <OtpInput
        containerStyle="otp_container"
        inputStyle="otp_input_style"
        value={otp}
        onChange={setOtp}
        shouldAutoFocus={true}
        numInputs={6}
        renderInput={(props) => <input {...props} />}
      />
       {<div id='recaptcha-container'></div>}
      <button className="btn1 button_otp" onClick={onOTPVerify}>
        Continue
      </button>
     
    </div>
  );
}

export default Otp;
