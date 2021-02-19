import "./App.scss";
import { Container, Row, Col } from "react-bootstrap";

import Menu from "../components/menu/Menu";

function App() {
  return (
    <Container fluid className="App bg-primary">
      <Row>
        <Menu />
        <Col xs={11} as="main">
          <p className="text-light">lol</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
