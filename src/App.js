import React from "react";
import Welcome_page from "./Components/welcome_page";
import { Route, Routes } from "react-router-dom";
import { createContext, useState } from "react";
import Create_account from "./Components/create_account";
import Otp from "./Components/otp";
import Account_Details from "./Components/account_Details";
import Location from "./Components/Location";
import Login_Options from "./Components/Login_Options";
import Final_Component from "./Components/Final_Component";
import StoreData from "./Components/StoreData";
export const AppContext = createContext();

function App() {
  const user = {
    name: "",
    phone: "",
    email: "",
    storeName: "",
    userId: "",
    location: {
      latitude: "",
      longitue: "",
      address:{
        line1:"",
        line2:"",
        city:"",
        state:"",
        pincode:"",
        country:""
      }
    },
    gstNumber: "",
    shopPhoto: "",
    drugLicense: "",
    schedule:{
      "monday": { open: false, from: "", to: "" },
      "tuesday": { open: false, from: "", to: "" },
      "wednesday": { open: false, from: "", to: "" },
      "thursday": { open: false, from: "", to: "" },
      "friday": { open: false, from: "", to: "" },
      "saturday": { open: false, from: "", to: "" },
      "sunday": { open: false, from: "", to: "" }
    }
    
  };

  const setUser = (e) => {
    for (let [key, value] of Object.entries(e)) {
      if (value != null) {
        user[key] = value;
      }
    }
  };

  return (
    <>
      <AppContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" Component={Welcome_page} />
          <Route path="/account" Component={Create_account} />
          <Route path="loginOptions" Component={Login_Options} />
          <Route path="/userDetails" Component={Account_Details} />
          <Route path="/otp" Component={Otp} />
          <Route path="/location" Component={Location} />
          <Route path="/storeData" Component={StoreData} />
          <Route path="/final" Component={Final_Component} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
