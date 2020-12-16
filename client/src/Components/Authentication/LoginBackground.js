import React from "react";
import "../../style/loginBackground.css";
import Login from "./Login";
import Register from "./Register";

import logo from "../../images/smallNoBackground.png";

const LoginBackground = (props) => {
  return (
    <div className="loginBackground">
      <div className="loginBackground-left">
        <img
          className="loginBackgroundLogo"
          src={logo}
          alt="website Logo"
        ></img>
        <header>Welcome to ApartmentFinder! </header>
        <p className="description">
          Login or register to find your dream apartment in the bay area. Play
          Apartment Tinder to search through and narrow your apartment choices.
        </p>
      </div>
      <div className="loginBackground-right">
        {props.login ? <Login></Login> : ""}
        {props.register ? <Register></Register> : ""}
      </div>
    </div>
  );
};

export default LoginBackground;
