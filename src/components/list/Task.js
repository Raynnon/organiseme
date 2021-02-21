import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import checkImage from "./images/check.png";

function Task(props) {
  const [completed, setCompleted] = useState(props.completed);
  const [taskName, setTaskName] = useState(props.taskName);

  console.log(completed);

  const handleClick = (e) => {
    setCompleted(!completed);
  };

  return (
    <Row className="bg-primary rounded pl-5 pr-5 pt-2 pb-2 mb-3 align-items-center text-center">
      <Col>
        <Image
          src={checkImage}
          alt="checkbox"
          className={completed ? "activated" : ""}
          style={{ width: "23px" }}
          onClick={(e) => handleClick(e)}
        />
      </Col>
      <Col>
        <p className="mb-0">{taskName}</p>
      </Col>
      <Col className="d-flex justify-content-center">
        {completed ? (
          <p
            className="mb-0 mr-0 pt-2 pb-2 pr-2 pl-2 text-success rounded-pill"
            style={{ backgroundColor: "#1f6153" }}
          >
            Completed
          </p>
        ) : (
          <p
            className="mb-0 mr-0 pt-2 pb-2 pr-2 pl-2 text-info rounded-pill "
            style={{ backgroundColor: "#4a3f77" }}
          >
            In progress
          </p>
        )}
      </Col>
      <Col className="d-flex justify-content-center">
        <p className="mb-0 mr-0 pt-2 pb-2 pr-2 pl-2 text-secondary">Delete</p>
      </Col>
    </Row>
  );
}

export default Task;
