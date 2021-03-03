import React, { useState } from "react";
import { userUpdate, deleteAccount } from "../../apiRoutes/userRoutes";

import { Container, Row, Col, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import "./profile.css";

import profileImage from "../images/florian.png";

function Profile(props) {
  const [nameChange, setNameChange] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const axiosOptions = props.axiosOptions;

  const onClickEdit = () => {
    setEditStatus(!editStatus);
  };

  const onClickConfirm = () => {
    if (nameChange && props.username !== nameChange) {
      props.onChange(nameChange);
      userUpdate({ username: nameChange }, axiosOptions);
    }
  };

  const handleDeleteAccount = () => {
    deleteAccount(axiosOptions);
    props.onDeleteAccount();
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
            <Col xs={12} md={{ span: "4", offset: "2" }}>
              {!editStatus ? (
                <h2 className="text-white text-center">{props.username}</h2>
              ) : (
                <Form.Control
                  className="bg-primary border-secondary text-light"
                  id="inputTask"
                  placeholder={props.username}
                  onChange={(e) => setNameChange(e.target.value)}
                />
              )}
            </Col>
            <Col
              xs={{ span: "1", offset: "5" }}
              md={{ span: "1", offset: "0" }}
              className="my-auto"
            >
              {!editStatus ? (
                <p className="edit text-secondary mb-0" onClick={onClickEdit}>
                  Edit
                </p>
              ) : (
                <p
                  className="edit text-secondary mb-0"
                  onClick={() => {
                    setEditStatus(!editStatus);
                    onClickConfirm();
                  }}
                >
                  Confirm
                </p>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="text-center">
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <p
            className="pillbutton mb-0 mr-0 p-2 mb-5 text-success rounded-pill"
            style={{ backgroundColor: "#1f6153", width: "250px" }}
            onClick={() => props.onDisconnect()}
          >
            Disconnect
          </p>
        </Col>
        <Col className="d-flex justify-content-center" xs={12} md={6}>
          <p
            className="pillbutton mb-0 mr-0 p-2 mb-5 text-info rounded-pill"
            style={{ backgroundColor: "#4a3f77", width: "250px" }}
            onClick={() => props.onDisconnectAll()}
          >
            Disconnect from all devices
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <p
          className="pillbutton mb-0 mr-0 p-2 text-warning rounded-pill text-center"
          style={{ backgroundColor: "#773f3f", width: "250px" }}
          onClick={handleDeleteAccount}
        >
          Delete Account
        </p>
      </Row>
    </Container>
  );
}

export default Profile;
