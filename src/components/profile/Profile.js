import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import "./profile.css";

import profileImage from "../images/florian.png";

function Profile(props) {
  const [nameChange, setNameChange] = useState(false);

  const onClickEdit = () => {
    setNameChange((prevNameChange) => !prevNameChange);
  };

  return (
    <Container className="bg-primary rounded pb-5">
      <Row className="mb-5">
        <Col xs={12} md={6}>
          <Image
            className="py-5 mx-auto d-block"
            src={profileImage}
            alt="profile-image"
            style={{ width: "150px" }}
          />
        </Col>
        <Col className="my-auto" xs={12} md={6}>
          <Row>
            <Col xs={12} md={{ span: "3", offset: "3" }}>
              {!nameChange ? (
                <h2 className="text-white text-center">{props.username}</h2>
              ) : (
                <h2>lol</h2>
              )}
            </Col>
            <Col
              xs={{ span: "1", offset: "5" }}
              md={{ span: "1", offset: "0" }}
              className="my-auto"
            >
              <p className="edit text-secondary mb-0" onClick={onClickEdit}>
                Edit
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <p
            className="mb-0 mr-0 p-2 mb-5 text-success rounded-pill"
            style={{ backgroundColor: "#1f6153", width: "250px" }}
          >
            Disconnect
          </p>
        </Col>
        <Col className="d-flex justify-content-center" xs={12} md={6}>
          <p
            className="mb-0 mr-0 p-2 mb-5 text-info rounded-pill"
            style={{ backgroundColor: "#4a3f77", width: "250px" }}
          >
            Disconnect from all devices
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <p
          className="mb-0 mr-0 p-2 text-warning rounded-pill text-center"
          style={{ backgroundColor: "#773f3f", width: "250px" }}
        >
          Delete Account
        </p>
      </Row>
    </Container>
  );
}

export default Profile;
