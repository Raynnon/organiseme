import { Image, Col } from "react-bootstrap";
import miniLogo from "./images/organise-me-mini-logo.png";
import "./menu.scss";

function Menu() {
  return (
    <Col
      xs={1}
      as="nav"
      className="border-right border-secondary menu-border text-center pt-5"
    >
      <ul>
        <li>
          <Image
            className="img-fluid"
            src={miniLogo}
            roundedCircle
            style={{ width: "2.5vw" }}
          />
        </li>
        <li className="active">
          <i className="bi bi-list-check" style={{ fontSize: "2.5vw" }}></i>
        </li>
        <li>
          <i
            className="bi bi-person-fill text-secondary"
            style={{ fontSize: "2.5vw" }}
          ></i>
        </li>
      </ul>
    </Col>
  );
}

export default Menu;
