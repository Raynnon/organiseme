import React, { useState, useEffect } from "react";
import "./App.scss";

import { Container, Row, Col } from "react-bootstrap";
import { userLogin } from "../apiRoutes/userRoutes";

import Menu from "../components/menu/Menu";
import List from "../components/list/List";
import Profile from "../components/profile/Profile";

function App() {
  const [token, setToken] = useState("");
  const [axiosOptions, setAxiosOptions] = useState({});
  const [activeElement, setActiveElement] = useState("List");

  useEffect(() => {
    const login = async () => {
      const data = await userLogin("test@gmail.com", "testtest");
      setToken(data.token);
      setAxiosOptions(data.options);
    };

    login();
  }, []);

  const handleChange = (active) => {
    setActiveElement(active);
  };

  let element;
  if (activeElement === "List") {
    element = <List token={token} axiosOptions={axiosOptions} />;
  } else if (activeElement === "Profile") {
    element = <Profile token={token} axiosOptions={axiosOptions} />;
  }

  return (
    <Container fluid className="App bg-dark">
      <Row>
        <Col
          xs={2}
          md={1}
          as="nav"
          className="border-right border-secondary menu-border text-center pt-5 px-0"
        >
          <Menu activeElement={activeElement} onChange={handleChange} />
        </Col>
        <Col xs={10} md={11} as="main">
          {element}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
