import React, { useState, useEffect } from "react";

import {
  getTasks,
  addTasks,
  updateTasks,
  deleteTasks,
} from "../../apiRoutes/tasksRoutes";

import { readProfilePicture, readProfile } from "../../apiRoutes/userRoutes";

import { useDispatch, useSelector } from "react-redux";

import { setImage, setName } from "../../actions";

import Task from "./Task";
import Pie from "./Pie";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function List() {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.name);
  const profilePicture = useSelector((state) => state.profilePicture.image);
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

  useEffect(() => {
    const picture = async () => {
      dispatch(setImage(await readProfilePicture()));
    };

    picture();
  }, [dispatch]);

  useEffect(() => {
    if (!name) {
      const username = async () => {
        dispatch(setName(await readProfile()));
      };

      username();
    }
  }, [dispatch, name]);

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
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (taskName) {
      await addTasks(taskName);
      const newTasks = await getTasks();
      setTasks(newTasks);
    }

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
            src={profilePicture}
            alt="profile-image"
            style={{ width: "150px" }}
          />
        </Col>
        <Col className="text-center my-auto" xs={12} md={6}>
          <h2 className="text-white">{name}</h2>
          <p className="text-secondary">
            Hello, you have {tasksInProgress}
            {tasksInProgress === 1 ? " task" : " tasks"} to achieve!
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
            <Col xs={8} sm={6} md={5} lg={3} className="my-1">
              <Form.Control
                className="bg-primary border-secondary text-light rounded-pill"
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

export default List;
