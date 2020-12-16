import React from "react";
import LandingNav from "../NavBars/LandingNav";
import "../../style/landing.css";

import LoginBackground from "../Authentication/LoginBackground";
import { useState } from "react";
const Landing = (props) => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  console.log(login);

  return (
    <div className="allLanding">
      <LandingNav setLogin={setLogin} setRegister={setRegister}></LandingNav>
      {login || register ? (
        <LoginBackground login={login} register={register}></LoginBackground>
      ) : (
        ""
      )}
    </div>
  );
};

export default Landing;
