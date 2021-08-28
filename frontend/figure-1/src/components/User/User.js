import React, { Component } from "react";
import Button from "react-bootstrap/lib/Button";
import axios from "axios";
import UserDetails from "../UserDetails/UserDetails";
import { Panel } from "react-bootstrap";
import {
  Card,
  CardHeader,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
} from "reactstrap";

const styles = {
  image: {
    height: 300,
    width: 300,
    resize: "both",
  },
};

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
      // console.log("logging user state in render.");
      // console.log(this.state.userData.data);
    }

    return (
      <div className="addmargin">
        <div className="col-md-3">
          {this.state.userData.data.data.map((user) => (
            <Card
              style={{ width: "18rem" }}
              bsStyle="info"
              key={user.username}
              className="centeralign"
            >
              <CardHeader>
                <CardTitle componentClass="h3">{user.username}</CardTitle>
              </CardHeader>
              <CardBody>
                <p>{user.title}</p>
                <p>{user.username}</p>
                <img
                  style={styles.image}
                  id="feed-image"
                  src={user.image_url}
                  alt="display image"
                />
                <br />
                {/* fix issue with user details not displaying */}
                <Button
                  bsStyle="info"
                  onClick={() => this.setState({ selectedUser: user.user_id })}
                >
                  Click to View Details
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
        <div className="col-md-6">
          <UserDetails val={this.state.selectedUser} />
        </div>
      </div>
    );
  }
}
