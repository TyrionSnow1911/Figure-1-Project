import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

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

export default class CaseDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getCaseDetails(this.props.val);
  }

  componentDidUpdate(prevProps) {
    if (this.props.val !== prevProps.val) {
      this.getCaseDetails(this.props.val);
    }
  }

  getCaseDetails(case_id) {
    axios
      .get(`http://localhost:5000/case_details`, {
        params: { case_id: case_id },
      })
      .then((response) => {
        this.setState({ caseDetails: response });
      });
  }

  render() {
    if (!this.state.caseDetails) return <p>Loading Data</p>;

    if (this.state.caseDetails) {
    }
    return (
      <div className="CaseDetails">
        <Card style={styles.detailsCard} bsStyle="info" className="centeralign">
          <CardHeader>
            <CardTitle componentClass="h3">
              {this.state.caseDetails.data.data.title}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <p>{this.state.caseDetails.data.data.username}</p>

            <img
              style={styles.image}
              id="feed-image"
              src={this.state.caseDetails.data.data.image_url}
              alt="display image"
            />
            <p>{this.state.caseDetails.data.data.caption}</p>
          </CardBody>
        </Card>
      </div>
    );
  }
}
