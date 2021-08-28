import React, { Component } from "react";
//import { Panel } from "react-bootstrap/lib/Panel";
import PanelHeading from "react-bootstrap/lib/PanelHeading";
import PanelTitle from "react-bootstrap/lib/PanelTitle";
import PanelBody from "react-bootstrap/lib/PanelBody";
import Button from "react-bootstrap/lib/Button";
import axios from "axios";
import UserDetails from "../UserDetails/UserDetails";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: 0,
    };
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getUserData();
  }

  //Function to get the User Data from json
  getUserData() {
    axios.get(`http://localhost:5000/user_data`).then((response) => {
      this.setState({ userData: response });
    });
  }

  render() {
    if (!this.state.userData) return <p>Loading data</p>;

    if (this.state.userData) {
      console.log("logging user state in render.");
      console.log(this.state.userData.data);
    }

    return (
      <div className="addmargin">
        <div className="col-md-3">
          {this.state.userData.data.data.map((user) => (
            <div bsstyle="info" key={user.username} className="centeralign">
              <PanelHeading>
                <PanelTitle componentClass="h3">{user.username}</PanelTitle>
              </PanelHeading>
              <PanelBody>
                <p>{user.title}</p>
                <p>{user.username}</p>
                <p>{user.image_url}</p>
                {/* render image on page instead of url */}
                <Button
                  bsStyle="info"
                  onClick={() => this.setState({ selectedUser: user.user_id })}
                >
                  Click to View Details
                </Button>
              </PanelBody>
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <UserDetails val={this.state.selectedUser} />
        </div>
      </div>
    );
  }
}
