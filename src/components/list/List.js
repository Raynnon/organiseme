import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import {
  getTasks,
  addTasks,
  updateTasks,
  deleteTasks,
} from "../../apiRoutes/tasksRoutes";

import Task from "./Task";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import profileImage from "./images/florian.png";

function Profile(props) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [tasksInProgress, setTasksInProgress] = useState(0);

  const token = props.token;
  const axiosOptions = props.axiosOptions;

  const completedManager = (completed, inProgress) => {
    if (completed) {
      setTasksCompleted((prevTasksCompleted) => prevTasksCompleted + completed);
    }

    if (inProgress) {
      setTasksInProgress(
        (prevTasksInProgress) => prevTasksInProgress + inProgress
      );
    }
  };

  useEffect(() => {
    getTasks(axiosOptions).then((newTasks) => {
      setTasks(newTasks);

      const completed = newTasks.filter((task) => task.completed).length;
      const inProgress = newTasks.length - completed;

      completedManager(completed, inProgress);
    });
  }, [axiosOptions]);

  const handleAddTaskName = (e) => {
    setTaskName(e.target.value);
  };

  //REFRESH TASKS
  const refreshTasks = () => {
    getTasks(axiosOptions).then((newTasks) => setTasks(newTasks));
  };

  // ADD TASK
  const handleAddTask = (e) => {
    e.preventDefault();

    addTasks(taskName, axiosOptions).then(refreshTasks());
    if (taskName) {
      completedManager(0, 1);
    }
  };
  useEffect(() => {
    console.log("TASKKKKS");
  }, [tasks]);

  // UPDATE TASK
  const handleUpdate = (id, completed) => {
    completed ? completedManager(1, -1) : completedManager(-1, 1);

    setTasks(
      tasks.map((task) => {
        if (task._id === id) {
          task.completed = completed;
        }
        return task;
      })
    );

    updateTasks(id, completed, axiosOptions);
  };

  // DELETE TASK
  const handleDelete = (id, completed) => {
    completed ? completedManager(-1, 0) : completedManager(0, -1);

    const newTasks = tasks.filter((task) => task._id !== id);
    setTasks(newTasks);

    deleteTasks(id, axiosOptions);
  };

  return (
    <Container>
      <Row className="bg-primary rounded mb-5">
        <Col xs={12} md={3}>
          <Image
            className="py-5 mx-auto d-block"
            src={profileImage}
            alt="profile-image"
            style={{ width: "150px" }}
          />
        </Col>
        <Col className="text-center my-auto" xs={12} md={6}>
          <h2 className="text-white">Florian</h2>
          <p className="text-secondary">
            Hello! You have {tasksInProgress} tasks to finish.
          </p>
        </Col>
        <Col xs={12} md={3}>
          <Row className="my-5 position-relative" style={{ height: "150px" }}>
            <ResponsivePie
              data={[
                {
                  id: "in-progress",
                  label: "In Progress",
                  value: tasksInProgress,
                },
                {
                  id: "completed",
                  label: "completed",
                  value: tasksCompleted,
                },
              ]}
              innerRadius={0.9}
              colors={["rgb(74, 63, 119)", "#298a5d"]}
              enableRadialLabels={false}
              enableSliceLabels={false}
              isInteractive={false}
              fill={[
                {
                  match: {
                    id: "in-progress",
                  },
                },
                {
                  match: {
                    id: "completed",
                  },
                },
              ]}
              legends={[]}
            />
            <h2
              className="text-white position-absolute d-flex align-items-center justify-content-center mb-0"
              style={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            >
              {Math.round(
                (tasksCompleted / (tasksInProgress + tasksCompleted)) * 100
              ) + "%"}
            </h2>
          </Row>
        </Col>
      </Row>

      <Container className="px-0 text-light" fluid>
        <Form
          className="pl-0 ml-0 text-center"
          onSubmit={(e) => handleAddTask(e)}
        >
          <Form.Row className="justify-content-center align-items-center mb-3">
            <Col sm={3} className="my-1">
              <Form.Control
                className="bg-primary border-secondary text-light"
                id="inlineFormInputName"
                placeholder="New task"
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
                  token={token}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  axiosOptions={axiosOptions}
                />
              );
            })
          : null}
      </Container>
    </Container>
  );
}

export default Profile;
