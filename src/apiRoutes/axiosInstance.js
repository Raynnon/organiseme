import axios from "axios";
import CookieManager from "../apiRoutes/cookieManager";

const axiosInstance = (route, options) => {
  const urlTasks = "http://localhost:4000/tasks";
  const urlUser = "http://localhost:4000/users";
  const token = CookieManager();
  let instance = "";

  axios.defaults.headers.Authorization = "Bearer " + token;
  if (route === "user") {
    if (options === "blob") {
      instance = axios.create({
        baseURL: urlUser,
        responseType: "blob",
      });
    } else {
      instance = axios.create({
        baseURL: urlUser,
      });
    }
  } else if (route === "tasks") {
    instance = axios.create({
      baseURL: urlTasks,
    });
  }

  return instance;
};

export default axiosInstance;
