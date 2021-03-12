import React from "react";

import "./task.css";

import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import checkImage from "./images/check.png";

function Task(props) {
  const taskName = props.taskName;

  const handleClickUpdate = () => {
    props.onUpdate(props.id, !props.completed);
  };

  const handleClickDelete = () => {
    props.onDelete(props.id, props.completed);
  };

  return (
    <Row className="bg-primary rounded px-5 py-2 mb-3 align-items-center text-center">
      <Col xs={12} md={1} className="my-1">
        <Image
          src={checkImage}
          alt="checkbox"
          id="check"
          className={props.completed ? "check activated" : "check"}
          style={{ width: "23px" }}
          onClick={() => handleClickUpdate()}
        />
      </Col>
      <Col xs={12} md={7} className="mb-1">
        <p className="mb-0">{taskName}</p>
      </Col>
      <Col xs={12} md={3} className="d-flex justify-content-center">
        {props.completed ? (
          <p
            className="mb-0 mr-0 p-2 text-success rounded-pill"
            style={{ backgroundColor: "#1f6153" }}
          >
            Completed
          </p>
        ) : (
          <p
            className="mb-0 mr-0 p-2 text-info rounded-pill "
            style={{ backgroundColor: "#4a3f77" }}
          >
            In progress
          </p>
        )}
      </Col>
      <Col xs={12} md={1} className="d-flex justify-content-center">
        <p
          className="mb-0 mr-0 p-2 text-secondary delete"
          style={{ backgroundColor: "none" }}
          onClick={(e) => handleClickDelete(e)}
        >
          Delete
        </p>
      </Col>
    </Row>
  );
}

export default Task;
