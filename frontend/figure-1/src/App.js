import React, { Component } from "react";
import "./App.css";
import Case from "./components/Case/Case.lazy";
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
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/case_data" />} />
            <Route exact path="/case_data" component={Case} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
