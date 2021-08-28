import React, { Component } from "react";

import axios from "axios";

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
  detailsCard: {
    position: "fixed",
    textAlign: "center",
    flexWrap: "wrap",
    width: "90rem",
    top: 10,
  },
};

//This Component is a child Component of Users Component
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getUserDetails(this.props.val);
  }

  componentDidUpdate(prevProps) {
    if (this.props.val !== prevProps.val) {
      this.getUserDetails(this.props.val);
    }
  }

  getUserDetails(user_id) {
    axios
      .get(`http://localhost:5000/user_details`, {
        params: { user_id: user_id },
      })
      .then((response) => {
        this.setState({ userDetails: response });
      });
  }

  render() {
    if (!this.state.userDetails) return <p>Loading Data</p>;

    if (this.state.userDetails) {
      console.log("logging user DETAILS in render.");
      console.log(this.state.userDetails.data);
      console.log(this.state.userDetails.data.data.username);
      console.log(this.state.userDetails.data.data.caption);
    }
    return (
      <div className="UserDetails">
        <Card style={styles.detailsCard} bsStyle="info" className="centeralign">
          <CardHeader>
            <CardTitle componentClass="h3">
              {this.state.userDetails.data.data.title}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <p>{this.state.userDetails.data.data.username}</p>

            <img
              style={styles.image}
              id="feed-image"
              src={this.state.userDetails.data.data.image_url}
              alt="display image"
            />
            <p>{this.state.userDetails.data.data.caption}</p>
          </CardBody>
        </Card>
      </div>
    );
  }
}
