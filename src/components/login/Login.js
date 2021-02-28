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
            className="fadeIn second bg-primary border-secondary text-light"
            name="login"
            placeholder="Username"
          />
          <Form.Control
            type="text"
            id="password"
            className="fadeIn third bg-primary border-secondary text-light"
            name="login"
            placeholder="Password"
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </Form>

        <div id="formFooter">
          <a className="underlineHover" href="#">
            Connect as Anonymous
          </a>
        </div>
      </div>
    </Row>
  );
}

export default Profile;
