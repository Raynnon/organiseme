import React, { useState } from "react";
import "./profile.css";

import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../actions";

import { Container, Row, Col, Form } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import {
  disconnectAll,
  userUpdate,
  deleteAccount,
} from "../../apiRoutes/UserRoutes";
import CookieManager from "../../apiRoutes/cookieManager";
import Buttons from "../subcomponents/Buttons";

import profileImage from "../images/profil-picture-anonymous.png";

function Profile(props) {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.name);
  const [nameChange, setNameChange] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const onClickConfirm = () => {
    if (nameChange && name !== nameChange) {
      dispatch(setName(nameChange));
      userUpdate(nameChange);
    }
  };

  const disconnect = (deletion) => {
    if (deletion === "deleteAccount") {
      deleteAccount();
    } else if (deletion === "deleteCookies") {
      disconnectAll();
    }

    CookieManager("delete");
    dispatch(setName(undefined));
    props.onDisconnect();
  };

  return (
    <Container className="bg-primary rounded pb-5">
      <Row className="mb-5">
        <Col xs={12} md={6}>
          <Image
            className="my-5 mx-auto d-block rounded-circle bg-secondary"
            src={profileImage}
            alt="profile-image"
            style={{ width: "150px" }}
          />
        </Col>
        <Col className="my-auto" xs={12} md={6}>
          <Row>
            <Col xs={12} md={{ span: "4", offset: "2" }}>
              {!editStatus ? (
                <h2 className="text-white text-center">{name}</h2>
              ) : (
                <Form.Control
                  className="bg-primary border-secondary text-light"
                  id="inputTask"
                  placeholder={name}
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
                <p
                  className="edit text-secondary mb-0"
                  onClick={() => setEditStatus(!editStatus)}
                >
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
        <Col xs={12} className="d-flex justify-content-center">
          <Buttons
            bgColor={"#1f6153"}
            textColor={"text-success"}
            description={"Disconnect"}
            handleClick={disconnect}
          />
        </Col>
        <Col className="d-flex justify-content-center" xs={12}>
          <Buttons
            bgColor={"#4a3f77"}
            textColor={"text-info"}
            description={"Disconnect all devices"}
            handleClick={() => disconnect("deleteCookies")}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Buttons
          bgColor={"#773f3f"}
          textColor={"text-warning"}
          description={"Delete account"}
          handleClick={() => disconnect("deleteAccount")}
        />
      </Row>
    </Container>
  );
}

export default Profile;
