import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import "./App.scss";
import CookieManager from "../apiRoutes/cookieManager";

import { Container, Row, Col } from "react-bootstrap";

import Login from "../components/login/Login";
import Menu from "../components/menu/Menu";
import List from "../components/list/List";
import Profile from "../components/profile/Profile";

function App() {
  const name = useSelector((state) => state.user.name);
  const [activeElement, setActiveElement] = useState("List");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(CookieManager());
  }, [name]);

  const element = () => {
    if (activeElement === "List") {
      return <List />;
    } else if (activeElement === "Profile") {
      return <Profile onDisconnect={() => setActiveElement("List")} />;
    }
  };

  return (
    <Container fluid className="App bg-dark">
      {!token ? (
        <Login />
      ) : (
        <Row>
          <Col
            xs={2}
            md={1}
            as="nav"
            className="border-right border-secondary menu-border text-center pt-5 px-0"
          >
            <Menu
              activeElement={activeElement}
              onChange={(active) => setActiveElement(active)}
            />
          </Col>
          <Col xs={10} md={11} as="main">
            {element()}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
