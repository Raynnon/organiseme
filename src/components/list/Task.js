import React, { useState } from "react";
import axios from "axios";

import "./task.css";

import { Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import checkImage from "./images/check.png";

function Task(props) {
  const [completed, setCompleted] = useState(props.completed);
  const [taskName, setTaskName] = useState(props.taskName);
  const [axiosOptions] = useState({
    headers: { Authorization: "Bearer " + props.token },
  });

  const handleClickUpdate = (e) => {
    const url = "http://localhost:4000/tasks/" + props.id;

    axios.patch(
      url,
      {
        completed: !completed,
      },
      axiosOptions
    );

    setCompleted(!completed);
  };

  const handleClickDelete = () => {
    props.onChange(true);
    const url = "http://localhost:4000/tasks/" + props.id;

    axios.delete(url, axiosOptions);
  };

  return (
    <Row className="bg-primary rounded px-5 py-2 mb-3 align-items-center text-center">
      <Col xs={12} sm={1}>
        <Image
          src={checkImage}
          alt="checkbox"
          className={completed ? "activated" : ""}
          style={{ width: "23px" }}
          onClick={(e) => handleClickUpdate(e)}
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
