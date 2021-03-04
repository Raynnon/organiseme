import React, { useState } from "react";
import { userLogin, userRegister } from "../../apiRoutes/userRoutes";

import { Image, Row, Form } from "react-bootstrap";

import "./login.css";
import logo from "../images/logo.png";

function Profile(props) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const data = await userLogin("test@gmail.com", "testtest");
      props.onNewCredentials(data.token, data.name, data.options);
      console.log(data.token, data.name, data.options);
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

  const onRegister = (e) => {
    e.preventDefault();
    userRegister(name, email, password);
  };

  return (
    <Row className="fadeInDown flex-direction-column justify-content-center align-items-center p-5 h-100">
      <div id="formContent" className="bg-primary rounded shadow text-center">
        <div className="fadeIn first">
          <Image src={logo} id="icon" alt="User Icon" />
        </div>

        <Form
          onSubmit={(e) => {
            isLogin ? login(e) : onRegister(e);
          }}
        >
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
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />

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
          <p id="anonymous" className="underlineHover m-0 text-primary">
            Connect as Anonymous
          </p>
        </div>
      </div>
    </Row>
  );
}

export default Profile;
