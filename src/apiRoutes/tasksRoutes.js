import axios from "axios";

const url = "http://localhost:4000/tasks";

export const getTasks = async (options) => {
  const tasks = await axios.get(url, options);

  return tasks.data;
};

export const addTasks = async (taskName, options) => {
  await axios.post(
    url,
    {
      description: taskName,
      completed: false,
    },
    options
  );
};

export const updateTasks = async (id, completed, options) => {
  axios.patch(
    url + "/" + id,
    {
      completed,
    },
    options
  );
};

export const deleteTasks = async (id, options) => {
  axios.delete(url + "/" + id, options);
};
