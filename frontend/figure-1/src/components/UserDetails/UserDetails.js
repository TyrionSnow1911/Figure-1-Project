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

//This Component is a child Component of Users Component
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getUserDetails(this.props.val);
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {
    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getUserDetails(this.props.val);
    }
  }

  //Function to Load the UserDetails data from json.
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
        <Card style={{ width: "18rem" }} bsStyle="info" className="centeralign">
          <CardHeader>
            <CardTitle componentClass="h3">
              {this.state.userDetails.data.data.username}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <p>Title : {this.state.userDetails.data.data.title}</p>
            <p>Username : {this.state.userDetails.data.data.username}</p>
            <p>Image : {this.state.userDetails.data.data.image_url}</p>
            <p>Caption : {this.state.userDetails.data.data.caption}</p>
          </CardBody>
        </Card>
      </div>
    );
  }
}

// {
//   "caption": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
//   "followers": 46,
//   "image_url": "http://dummyimage.com/1243x113.png/ff4444/ffffff",
//   "likes": 411,
//   "profile_image_url": "http://dummyimage.com/100x100.png/ff4444/ffffff",
//   "title": "Quam nec dui",
//   "username": "jcranstone0"
// },
