import axios from "axios";
import CookieManager from "../apiRoutes/cookieManager";

const axiosInstance = (route) => {
  const urlTasks = "http://localhost:4000/tasks";
  const urlUser = "http://localhost:4000/users";
  const token = CookieManager();
  let instance = "";

  if (route === "user") {
    instance = axios.create({
      baseURL: urlUser,
      headers: { Authorization: "Bearer " + token },
    });
  } else if (route === "tasks") {
    instance = axios.create({
      baseURL: urlTasks,
      headers: { Authorization: "Bearer " + token },
    });
  }

  return instance;
};

export default axiosInstance;
