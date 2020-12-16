import { Navbar, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const MainPageNav = (props) => {
  const history = useHistory();
  const [user, setUser] = useState("");

  const logOut = async () => {
    await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    history.push("/");
  };

  const getCurrentUser = async () => {
    console.log("start process");
    try {
      const parties = await fetch("/user", {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // "Content-Type": "application/x-www-form-urlencoded",
          // "Access-Control-Allow-Headers", "Content-Type"
        },
      });

      const current = await parties.json();
      console.log("current", current.user);
      setUser(current.user.username);
      props.setCurrentUser(current.user);
      console.log(user);
    } catch (err) {
      console.log("error ", err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <Navbar>
      <Button
        variant="btn bg-transparent"
        onClick={() => {
          props.setAptTinder(false);
          history.push("/home");
        }}
      >
        Welcome, {user}
      </Button>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Button
          variant="btn bg-transparent"
          onClick={() => {
            props.setAptTinder(true);
          }}
        >
          Apartment Tinder
        </Button>
        <Button variant="btn bg-transparent" onClick={logOut}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainPageNav;
