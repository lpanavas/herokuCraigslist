import { Navbar, Button } from "react-bootstrap";
import React from "react";
import { useHistory } from "react-router-dom";
import "../../style/landingNav.css";
import logo from "../../images/smallNoBackground.png";
const LandingNav = (props) => {
  const history = useHistory();

  const logOut = async () => {
    await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.setLogin(false);
    props.setRegister(false);
    history.push("/");
  };

  return (
    <Navbar className="landingNavBar">
      <Button
        className="landingNavBar-header"
        variant="btn bg-transparent"
        onClick={() => {
          props.setLogin(false);
          props.setRegister(false);
          history.push("/");
        }}
      >
        <img className="navLogo" src={logo} alt="website Logo"></img>
        ApartmentFinder
      </Button>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button
          variant="btn bg-transparent"
          onClick={() => {
            props.setLogin(true);
            props.setRegister(false);
          }}
        >
          Login
        </Button>
        <Button
          variant="btn bg-transparent"
          onClick={() => {
            props.setLogin(false);
            props.setRegister(true);
          }}
        >
          Register
        </Button>
        <Button variant="btn bg-transparent" onClick={logOut}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LandingNav;
