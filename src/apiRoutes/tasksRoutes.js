import axios from "axios";
import CookieManager from "../apiRoutes/cookieManager";

const url = "http://localhost:4000/tasks";

export const getTasks = async () => {
  const tasks = await axios.get(url, CookieManager());

  return tasks.data;
};

export const addTasks = async (taskName) => {
  await axios.post(
    url,
    {
      description: taskName,
      completed: false,
    },
    CookieManager()
  );
};

export const updateTasks = async (id, completed) => {
  axios.patch(
    url + "/" + id,
    {
      completed,
    },
    CookieManager()
  );
};

export const deleteTasks = async (id) => {
  axios.delete(url + "/" + id, CookieManager());
};
