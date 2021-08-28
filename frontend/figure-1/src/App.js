import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import User from "./components/User/User";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const styles = {
  header: {
    position: "fixed",
  },
};

class App extends Component {
  render() {
    console.log("Host URL" + process.env.PUBLIC_URL);
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          {/* <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Figure-1 Assignment</h1>
          </header> */}
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/user_data" />} />
            <Route exact path="/user_data" component={User} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
