import axiosInstance from "../apiRoutes/axiosInstance";

export const getTasks = async () => {
  const tasks = await axiosInstance("tasks").get("/");

  return tasks.data;
};

export const addTasks = async (taskName) => {
  await axiosInstance("tasks").post("/", {
    description: taskName,
    completed: false,
  });
};

export const updateTasks = async (id, completed) => {
  axiosInstance("tasks").patch("/" + id, {
    completed,
  });
};

export const deleteTasks = async (id) => {
  axiosInstance("tasks").delete("/" + id);
};
