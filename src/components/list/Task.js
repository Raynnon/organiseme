import React, { useState } from "react";
import { updateTasks } from "../../apiRoutes/tasksRoutes";

import "./task.css";

import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import checkImage from "./images/check.png";

function Task(props) {
  const [completed, setCompleted] = useState(props.completed);
  const taskName = props.taskName;
  const axiosOptions = props.axiosOptions;

  const handleClickUpdate = () => {
    setCompleted(!completed);
    updateTasks(props.id, !completed, axiosOptions);
  };

  const handleClickDelete = () => {
    props.onDelete(props.id);
  };

  return (
    <Row className="bg-primary rounded px-5 py-2 mb-3 align-items-center text-center">
      <Col xs={12} sm={1}>
        <Image
          src={checkImage}
          alt="checkbox"
          className={completed ? "activated" : ""}
          style={{ width: "23px" }}
          onClick={() => handleClickUpdate()}
        />
      </Col>
      <Col xs={12} sm={5}>
        <p className="mb-0">{taskName}</p>
      </Col>
      <Col xs={12} sm={5} className="d-flex justify-content-center">
        {completed ? (
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
      <Col xs={12} sm={1} className="d-flex justify-content-center">
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
