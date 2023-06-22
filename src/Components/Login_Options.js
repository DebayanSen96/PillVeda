import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login_Options.css";
import { clientId, apiKey } from "../secrets/parameters";
import LOGO from "./images/logo.png";
import { gapi } from "gapi-script";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import Wave from "react-wavify";
import { useState } from "react";
function Login_Options() {
  var data = useContext(AppContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [show, setShow] = useState(true);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const start = (data, loadClient) => {
      gapi.client.init({
        clientId: clientId,
        scope: "https://www.googleapis.com/auth/user.phonenumbers.read",
      });
    };
    gapi.load("client:auth2", start);

    //

    //
  }, []);
  const loadClient = () => {
    window.gapi.client.setApiKey(apiKey);
    return window.gapi.client
      .load("https://people.googleapis.com/$discovery/rest?version=v1")
      .then(
        () => {
          console.log("GAPI client loaded for api");
          /*execute();*/
        },
        (err) => {
          console.log("error loading GAPI client for api: ", err);
        }
      );
  };

  function execute() {
    return gapi.client.people.people
      .get({
        resourceName: "people/me",
        personFields: "phoneNumbers",
      })
      .then(
        function (response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
          let phoneNo = "+91" + response.result.phoneNumbers[0].value;
          setPhone(phoneNo);
        },
        function (err) {
          console.error("Execute error", err);
        }
      );
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const onSuccess = async (res) => {
    console.log("Login Success! Current User: ", res.profileObj);
    setEmail(res.profileObj.email);
    setUserId(res.profileObj.googleId);
    setName(res.profileObj.name);
    setShow(false);
    loadClient();
    setLoggedIn(true);
    await delay(2000);
    document.getElementById("btn").click();
  };
  const onFailure = (res) => {
    console.log("Login Failed! ress: ", res);
  };
  const handle_logout = () => {
    setLoggedIn(false);
    setPhone("");
    setEmail("");
    setUserId("");
    setName("");
    setShow(true);
  };
  const submitHandler = (res) => {
    let temp = { ...data.user };
    temp = {
      ...temp,
      userId,
      email,
      name,
    };

    data.setUser(temp);

    console.log(temp);
    navigate("/userDetails");
  };
  return (
    <div className="main_container">
      <Wave
        className="wave"
        fill="rgba(7, 127, 240, 0.35)"
        paused={false}
        options={{
          height: 20,
          amplitude: 40,
          speed: 0.2,
          points: 4,
        }}
      />
      <img className="logo sign_in_logo" src={LOGO} />
      {/*loggedIn? <button className='btn1 new_btn' onClick={submitHandler}>Continue</button>:<button className='btn1 new_btn' onClick={submitHandler}>Create New Account</button>*/}

      <h3 className="google_text">Sign In with Google</h3>
      {!loggedIn && (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In"
          render={(renderProps) => (
            <button className="btn1 new_btn" onClick={renderProps.onClick}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327"
                width="20px"
                className="g_logo"
              />
              Sign in with Google
            </button>
          )}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
      {loggedIn && (
        <GoogleLogout
          clientId={clientId}
          render={(renderProps) => (
            <button className="btn1 new_btn" onClick={renderProps.onClick}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327"
                width="20px"
                className="g_logo"
              />
              Sign Out
            </button>
          )}
          buttonText={"Logout"}
          onLogoutSuccess={handle_logout}
        />
      )}
      <button id="btn" hidden={true} onClick={submitHandler}>
        Cick
      </button>
      {/*
         <div className="bottom__text">
        <h6>Already have and account?</h6>
        <Link style={{ textDecoration: "none" }}>
          <h5>LOG IN</h5>
        </Link>
      </div>
        */}
    </div>
  );
}

export default Login_Options;
