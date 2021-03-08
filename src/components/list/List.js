import React, { useState, useEffect } from "react";
import {
  getTasks,
  addTasks,
  updateTasks,
  deleteTasks,
} from "../../apiRoutes/tasksRoutes";

import Task from "./Task";
import Pie from "./Pie";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import profileImage from "../images/profil-picture-anonymous.png";

function Profile(props) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [tasksInProgress, setTasksInProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    getTasks().then((newTasks) => {
      setTasks(newTasks);
    });
  }, []);

  // Reasign tasks completion
  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const inProgress = tasks.length - completed;

    setTasksCompleted(completed);
    setTasksInProgress(inProgress);

    let percentage = Math.round((completed / tasks.length) * 100);
    isNaN(percentage) ? setPercentage("") : setPercentage(percentage + "%");
  }, [tasks]);

  const handleAddTaskName = (e) => {
    setTaskName(e.target.value);
  };

  // ADD TASK
  const handleAddTask = (e) => {
    e.preventDefault();
    addTasks(taskName).then(getTasks().then((newTasks) => setTasks(newTasks)));

    e.target.inputTask.value = "";
    setTaskName("");
  };

  // UPDATE TASK
  const handleUpdate = (id, completed) => {
    setTasks(
      tasks.map((task) => {
        if (task._id === id) {
          task.completed = completed;
        }
        return task;
      })
    );

    updateTasks(id, completed);
  };

  // DELETE TASK
  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);
    setTasks(newTasks);

    deleteTasks(id);
  };

  return (
    <Container>
      <Row className="bg-primary rounded mb-5">
        <Col xs={12} md={3}>
          <Image
            className="my-5 mx-auto d-block rounded-circle bg-secondary"
            src={profileImage}
            alt="profile-image"
            style={{ width: "150px" }}
          />
        </Col>
        <Col className="text-center my-auto" xs={12} md={6}>
          <h2 className="text-white">{props.name}</h2>
          <p className="text-secondary">
            Hello, you have {tasksInProgress} tasks to achieve!
          </p>
        </Col>
        <Col xs={12} md={3}>
          <Row className="my-5 position-relative" style={{ height: "150px" }}>
            <Pie completed={tasksCompleted} inProgress={tasksInProgress} />
            <h2
              className="text-white position-absolute d-flex align-items-center justify-content-center mb-0"
              style={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              {percentage}
            </h2>
          </Row>
        </Col>
      </Row>

      <Container className="px-0 text-light" fluid>
        <Form
          id="new-task"
          className="pl-0 ml-0 text-center"
          onSubmit={(e) => handleAddTask(e)}
        >
          <Form.Row className="justify-content-center align-items-center mb-3">
            <Col sm={3} className="my-1">
              <Form.Control
                className="bg-primary border-secondary text-light"
                id="inputTask"
                placeholder="New Task"
                onChange={handleAddTaskName}
              />
            </Col>
            <Col xs="auto" className="mb-0">
              <Button className="text-light" type="submit">
                Add
              </Button>
            </Col>
          </Form.Row>
        </Form>

        {tasks
          ? tasks.map((task) => {
              return (
                <Task
                  key={task._id}
                  id={task._id}
                  completed={task.completed}
                  taskName={task.description}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              );
            })
          : null}
      </Container>
    </Container>
  );
}

export default Profile;
