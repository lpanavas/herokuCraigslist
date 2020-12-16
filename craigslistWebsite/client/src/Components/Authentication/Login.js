import React from "react";
import { useState } from "react";

import { useHistory } from "react-router-dom";
import "../../style/login.css";
const Login = (props) => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const loginUserPassport = async () => {
    console.log("loginuserfunction");

    try {
      const res = await fetch("/signinn", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: loginUsername,
          password: loginPassword,
        }),
      });
      var currentUser = null;
      try {
        currentUser = await res.json();
        console.log("current user", currentUser);
        setUser(currentUser.username);
      } catch (err) {
        console.log("err", err);
      }

      if (currentUser) {
        console.log("user get info", user);
        history.push("/home");
      } else {
        setError("incorrect username or password");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="loginInput">
      <h1>ApartmentFinder</h1>
      <h2>Login</h2>
      <form>
        <label>
          Username
          <input
            type="text"
            value={loginUsername}
            onChange={(evt) => setLoginUsername(evt.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={loginPassword}
            onChange={(evt) => setLoginPassword(evt.target.value)}
          />
        </label>
        <button
          className="loginRegisterButton"
          type="button"
          onClick={loginUserPassport}
        >
          Submit
        </button>
      </form>
      <div>{error ? <p className="errorMessage">{error}</p> : ""}</div>
    </div>
  );
};
export default Login;
//Can just be a component not a whole page.
