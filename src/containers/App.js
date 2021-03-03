import React, { useState } from "react";
import { disconnectAll } from "../apiRoutes/userRoutes";
import "./App.scss";

import { Container, Row, Col } from "react-bootstrap";

import Login from "../components/login/Login";
import Menu from "../components/menu/Menu";
import List from "../components/list/List";
import Profile from "../components/profile/Profile";

function App() {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [axiosOptions, setAxiosOptions] = useState({});
  const [activeElement, setActiveElement] = useState("List");

  const newCredential = (token, name, options) => {
    setToken(token);
    setUsername(name);
    setAxiosOptions(options);
  };

  const disconnect = () => {
    setToken("");
    setActiveElement("List");
  };

  const element = () => {
    if (activeElement === "List") {
      return (
        <List token={token} username={username} axiosOptions={axiosOptions} />
      );
    } else if (activeElement === "Profile") {
      return (
        <Profile
          token={token}
          username={username}
          axiosOptions={axiosOptions}
          onChange={(newUsername) => setUsername(newUsername)}
          onDisconnect={disconnect}
          onDisconnectAll={() => {
            disconnectAll(axiosOptions);
            disconnect();
          }}
          onDeleteAccount={disconnect}
        />
      );
    }
  };

  return (
    <Container fluid className="App bg-dark">
      {!token ? (
        <Login onNewCredentials={newCredential} />
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
