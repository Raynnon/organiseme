import React, { useState, useEffect } from "react";
import { disconnectAll, readProfile } from "../apiRoutes/UserRoutes";
import "./App.scss";
import CookieManager from "../apiRoutes/cookieManager";

import { Container, Row, Col } from "react-bootstrap";

import Login from "../components/login/Login";
import Menu from "../components/menu/Menu";
import List from "../components/list/List";
import Profile from "../components/profile/Profile";

function App() {
  const [activeElement, setActiveElement] = useState("List");
  const [name, setName] = useState("");
  const [options, setOptions] = useState("");

  useEffect(() => {
    readProfile().then((name) => console.log(name));
  }, []);

  useEffect(() => {
    setOptions(CookieManager());
  }, [name]);

  const onNewName = (newName) => {
    setName(newName);
  };

  const disconnect = () => {
    CookieManager("delete");
    setOptions(CookieManager());
    setName(undefined);
    setActiveElement("List");
  };

  const element = () => {
    if (activeElement === "List") {
      return <List name={name} />;
    } else if (activeElement === "Profile") {
      return (
        <Profile
          name={name}
          onNewName={onNewName}
          onDisconnect={disconnect}
          onDisconnectAll={() => {
            disconnectAll();
            disconnect();
          }}
          onDeleteAccount={disconnect}
        />
      );
    }
  };

  return (
    <Container fluid className="App bg-dark">
      {!options ? (
        <Login onNewName={onNewName} />
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
