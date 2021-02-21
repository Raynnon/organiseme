import React from "react";
import Task from "./Task";

import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import checkImage from "./images/check.png";
import profileImage from "./images/florian.png";

function Profile() {
  return (
    <Container>
      <Row className="bg-primary rounded pt-5 mb-5">
        <Col xs={12} md={3}>
          <Image
            className="pt-5 pb-5 mx-auto d-block"
            src={profileImage}
            alt="profile-image"
            style={{ width: "60%", maxWidth: "150px" }}
          />
        </Col>
        <Col xs={12} md={6}>
          <h2 className="text-white">Florian</h2>
          <p className="text-secondary">
            Hello! You have 3 new tasks to finish.
          </p>
        </Col>
        <Col xs={12} md={3}>
          <p className="text-secondary text-center">Progress</p>
        </Col>
      </Row>
      <Container className="pl-0 pr-0 text-light" fluid>
        <Task completed={true} taskName="Read a book" />
        <Task completed={false} taskName="Finish this site" />
        <Task completed={false} taskName="Play Counter Strike" />
      </Container>
    </Container>
  );
}

export default Profile;
