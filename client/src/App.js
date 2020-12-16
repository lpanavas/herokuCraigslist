import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";

import Landing from "./Components/Authentication/Landing";
import Home from "./Components/MainPage/Home";

const Routes = () => {
  console.log("home", Home);
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
      </div>
    </Router>
  );
};

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
