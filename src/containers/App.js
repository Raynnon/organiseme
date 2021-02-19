import React, { useState } from "react";
import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";

import Menu from "../components/menu/Menu";
import List from "../components/list/List";
import Profile from "../components/profile/Profile";

function App() {
  const [activeElement, setActiveElement] = useState("List");

  const handleChange = (active) => {
    setActiveElement(active);
  };

  let element;
  if (activeElement === "List") {
    element = <List />;
  } else if (activeElement === "Profile") {
    element = <Profile />;
  }

  return (
    <Container fluid className="App bg-dark">
      <Row>
        <Col
          xs={2}
          md={1}
          as="nav"
          className="border-right border-secondary menu-border text-center pt-5 pl-0 pr-0"
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
