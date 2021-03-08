import React, { useState, useEffect } from "react";
import { userLogin, userRegister } from "../../apiRoutes/UserRoutes";

import { Image, Row, Form } from "react-bootstrap";

import "./login.css";
import logo from "../images/logo.png";

function Profile(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setErrorMessage("");
  }, [isLogin]);

  const login = async (e) => {
    e.preventDefault();

    let data = "";

    if (e.target.id === "anonymous") {
      data = await userRegister(
        "Anonymous",
        "anonymous" + Math.random() * 100 + "@anonymous.com",
        "anonymouspassword"
      );
    } else {
      if (isLogin) {
        data = await userLogin(email, password);
        console.log(data.error);
      } else {
        data = await userRegister(name, email, password);
      }
    }

    if (data.error) {
      setErrorMessage(data.error);
    } else {
      setErrorMessage("");
      props.onNewName(data);
    }
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Row className="fadeInDown flex-direction-column justify-content-center align-items-center p-5 h-100">
      <div id="formContent" className="bg-primary rounded shadow text-center">
        <div className="fadeIn first">
          <Image src={logo} id="icon" alt="organise-me-logo" />
        </div>

        <Form onSubmit={(e) => login(e)}>
          {!isLogin ? (
            <Form.Control
              type="text"
              id="name"
              className="bg-primary border-secondary text-light text-center mb-2 d-inline w-75"
              name="name"
              placeholder="Name"
              onChange={(e) => handleChange(e)}
            />
          ) : null}
          <Form.Control
            type="text"
            id="email"
            className="fadeIn second bg-primary border-secondary text-light text-center mb-2 d-inline w-75"
            name="email"
            placeholder="Email"
            onChange={(e) => handleChange(e)}
          />
          <Form.Control
            type="text"
            id="password"
            className="fadeIn third bg-primary border-secondary text-light text-center mb-3 d-inline w-75"
            name="password"
            placeholder={isLogin ? "Password" : "Password (min. 6 chars)"}
            onChange={(e) => handleChange(e)}
          />
          <p className="text-warning" style={{ height: "24px" }}>
            {errorMessage}
          </p>
          <input
            type="submit"
            className="pillbutton fadeIn fourth mb-0 mr-0 p-2 mb-3 text-success rounded-pill"
            value={isLogin ? "Log In" : "Register"}
            style={{ backgroundColor: "#1f6153", width: "250px" }}
          />
        </Form>
        <Row className="justify-content-center">
          <p
            id="register"
            className="text-secondary"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </p>
        </Row>

        <div className="rounded-bottom bg-light py-4">
          <p
            id="anonymous"
            className="underlineHover m-0 text-primary"
            onClick={(e) => login(e)}
          >
            Anonymous login
          </p>
        </div>
      </div>
    </Row>
  );
}

export default Profile;
