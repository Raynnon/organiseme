import "./App.scss";

import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <Container fluid className="App bg-primary">
      <Row>
        <Col
          xs={1}
          as="nav"
          className="border-right border-secondary menu-border text-center pt-5"
        >
          <p>
            <i
              className="bi bi-list-check text-secondary text-secondary"
              style={{ fontSize: "3vw" }}
            ></i>
          </p>
          <p>
            <i
              className="bi bi-person-fill text-secondary"
              style={{ fontSize: "3vw" }}
            ></i>
          </p>
        </Col>
        <Col xs={11} as="main">
          <p className="text-light">lol</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
