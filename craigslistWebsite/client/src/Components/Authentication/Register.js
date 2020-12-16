import React from "react";
import { useState } from "react";

import { useHistory } from "react-router-dom";
const Register = (props) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const registerUserPassport = async () => {
    try {
      const res = await fetch("/register", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword,
        }),
      });

      var currentUser = null;
      try {
        currentUser = await res.json();
        console.log("current user", currentUser);
      } catch (err) {
        console.log("err", err);
      }

      if (currentUser) {
        userPassport(currentUser);
      } else {
        setError("Username taken. Please choose another username");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const userPassport = async (newRegisterUser) => {
    console.log("loginuserfunction");
    console.log("hello");

    var registerUser = await newRegisterUser;
    registerUser.password = registerPassword;
    try {
      const res = await fetch("/signinn", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: registerUser.username,
          password: registerUser.password,
        }),
      });
      var currentUser = null;
      try {
        currentUser = await res.json();
        console.log("current user", currentUser);
        setUser(currentUser);
      } catch (err) {
        console.log("err", err);
      }

      if (currentUser) {
        console.log("user get info", user);
        history.push("/home");
      } else {
        setError("not in login");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="loginInput">
      <h1>ApartmentFinder</h1>
      <h2>Register</h2>
      <form>
        <label>
          Username
          <input
            type="text"
            value={registerUsername}
            onChange={(evt) => setRegisterUsername(evt.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={registerPassword}
            onChange={(evt) => setRegisterPassword(evt.target.value)}
          />
        </label>
        <button
          className="loginRegisterButton"
          type="button"
          onClick={registerUserPassport}
        >
          Submit
        </button>
      </form>
      <div>{error ? <p className="errorMessage">{error}</p> : ""}</div>
    </div>
  );
};
export default Register;
