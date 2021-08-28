import React, { Component } from "react";
import axios from "axios";
import CaseDetails from "../CaseDetails/CaseDetails";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

const styles = {
  image: {
    height: 300,
    width: 300,
    resize: "both",
  },
  card: {
    display: "flex",
  },
};

export default class Case extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCase: 0,
    };
  }

  componentDidMount() {
    this.getCaseData();
  }

  getCaseData() {
    axios.get(`http://localhost:5000/case_data`).then((response) => {
      this.setState({ caseData: response });
    });
  }

  render() {
    if (!this.state.caseData) return <p>Loading data</p>;

    if (this.state.caseData) {
    }

    return (
      <div className="addmargin" style={styles.card}>
        <div className="col-md-3">
          {this.state.caseData.data.data.map((caseData) => (
            <Card
              style={{ width: "18rem" }}
              bsStyle="info"
              key={caseData.username}
              className="centeralign"
            >
              <br />
              <CardHeader>
                <CardTitle componentClass="h3">
                  <b>Title: </b>
                  {caseData.title}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <p>
                  <b>Username: </b> {caseData.username}
                </p>
                <b>Click image to learn more.</b>
                <img
                  onClick={() =>
                    this.setState({ selectedCase: caseData.case_id })
                  }
                  style={styles.image}
                  id="feed-image"
                  src={caseData.image_url}
                  alt="display image"
                />

                <br />
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="col-md-6">
          <CaseDetails val={this.state.selectedCase} />
        </div>
      </div>
    );
  }
}
