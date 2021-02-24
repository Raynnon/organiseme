import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import { getTasks, addTasks, deleteTasks } from "../../apiRoutes/tasksRoutes";

import Task from "./Task";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import profileImage from "./images/florian.png";

function Profile(props) {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");

  const token = props.token;
  const axiosOptions = props.axiosOptions;
  const data = [
    {
      id: "completed",
      label: "completed",
      value: 75,
    },
    {
      id: "in-progress",
      label: "In Progress",
      value: 25,
    },
  ];

  const refreshTasks = () => {
    getTasks(axiosOptions).then((data) => setTasks(data));
  };

  useEffect(() => {
    getTasks(axiosOptions).then((data) => setTasks(data));
  }, [axiosOptions]);

  const handleAddTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    addTasks(taskName, axiosOptions).then(refreshTasks());
  };

  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);
    setTasks(newTasks);

    deleteTasks(id, axiosOptions);
  };

  return (
    <Container>
      <Row className="bg-primary rounded pt-5 mb-5">
        <Col xs={12} md={3}>
          <Image
            className="py-5 mx-auto d-block"
            src={profileImage}
            alt="profile-image"
            style={{ width: "60%", maxWidth: "150px" }}
          />
        </Col>
        <Col xs={12} md={6}>
          <h2 className="text-white">Florian</h2>
          <p className="text-secondary">Hello! You have X tasks.</p>
        </Col>
        <Col xs={12} md={3}>
          <Row>
            <p className="text-secondary">Progress</p>
          </Row>
          <Row style={{ height: "150px" }}>
            <ResponsivePie
              data={data}
              sortByValue={false}
              innerRadius={0.9}
              colors={{ scheme: "nivo" }}
              enableRadialLabels={false}
              enableSliceLabels={false}
              isInteractive={false}
              fill={[
                {
                  match: {
                    id: "completed",
                  },
                },
                {
                  match: {
                    id: "in-progress",
                  },
                },
              ]}
              legends={[]}
            />
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
