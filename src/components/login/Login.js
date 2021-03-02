import React, { useState } from "react";
import { userUpdate } from "../../apiRoutes/userRoutes";

import { Image, Row, Col, Form } from "react-bootstrap";

import "./login.css";
import logo from "../images/logo.png";

function Profile(props) {
  return (
    <Row className="fadeInDown flex-direction-column justify-content-center align-items-center p-5 h-100">
      <div id="formContent" className="bg-primary rounded shadow text-center">
        <div className="fadeIn first">
          <Image src={logo} id="icon" alt="User Icon" />
        </div>

        <Form>
          <Form.Control
            type="text"
            id="login"
            className="fadeIn second bg-primary border-secondary text-light text-center mb-2 d-inline w-75"
            name="login"
            placeholder="Email"
          />
          <Form.Control
            type="text"
            id="password"
            className="fadeIn third bg-primary border-secondary text-light text-center mb-3 d-inline w-75"
            name="login"
            placeholder="Password"
          />
          <input
            type="submit"
            className="fadeIn fourth mb-0 mr-0 p-2 mb-3 text-success rounded-pill"
            value="Log In"
            style={{ backgroundColor: "#1f6153", width: "250px" }}
          />
        </Form>
        <Row className="justify-content-center">
          <p id="register" className="text-secondary">
            Register
          </p>
        </Row>

        <div className="rounded-bottom bg-light py-4">
          <p id="anonymous" className="underlineHover m-0 text-primary">
            Connect as Anonymous
          </p>
        </div>
      </div>
    </Row>
  );
}

export default Profile;
