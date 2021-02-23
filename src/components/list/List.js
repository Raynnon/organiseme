import React, { useState, useEffect } from "react";
import axios from "axios";
import Task from "./Task";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

import profileImage from "./images/florian.png";

function Profile() {
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskListUpdate, setTaskListUpdate] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [axiosOptions, setAxiosOptions] = useState({});
  const urlTasks = "http://localhost:4000/tasks";

  useEffect(() => {
    const getToken = async () => {
      try {
        const login = await axios.post("http://localhost:4000/users/login", {
          email: "test@gmail.com",
          password: "testtest",
        });

        setToken(login.data.token);
        setAxiosOptions({
          headers: { Authorization: "Bearer " + login.data.token },
        });
      } catch (e) {
        console.log(e);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    setTaskListUpdate(false);
    if (token) {
      const getTasks = async () => {
        try {
          const tasksList = await axios.get(urlTasks, axiosOptions);

          setTasks(tasksList.data);
        } catch (e) {
          console.log(e);
        }
      };

      getTasks();
    }
  }, [token, taskListUpdate, axiosOptions]);

  const handleChange = () => {
    setTaskListUpdate(true);
  };

  const handleChangeTaskName = (e) => {
    setTaskName(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    axios.post(
      urlTasks,
      {
        description: taskName,
        completed: false,
      },
      axiosOptions
    );

    handleChange();
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
          <p className="text-secondary">
            Hello! You have {tasks.length} tasks.
          </p>
        </Col>
        <Col xs={12} md={3}>
          <p className="text-secondary text-center">Progress</p>
        </Col>
      </Row>

      <Container className="px-0 text-light" fluid>
        <Form
          className="pl-0 ml-0 text-center"
          onSubmit={(e) => handleAddTask(e)}
        >
          <Form.Row className="justify-content-center">
            <Col sm={3} className="my-1">
              <Form.Control
                className="bg-primary border-secondary text-light"
                id="inlineFormInputName"
                placeholder="New task"
                onChange={handleChangeTaskName}
              />
            </Col>
            <Col xs="auto" className="mb-4">
              <Button className="text-light" type="submit">
                Add
              </Button>
            </Col>
          </Form.Row>
        </Form>

        {tasks.map((task) => {
          return (
            <Task
              key={task._id}
              id={task._id}
              completed={task.completed}
              taskName={task.description}
              token={token}
              onChange={handleChange}
            />
          );
        })}
      </Container>
    </Container>
  );
}

export default Profile;
