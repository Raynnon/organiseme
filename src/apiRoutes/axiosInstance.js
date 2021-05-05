import axios from "axios";
import CookieManager from "../apiRoutes/cookieManager";

const axiosInstance = (route, options) => {
  console.log(process.env);
  const urlTasks = process.env.REACT_APP_API_URL + "/tasks";
  const urlUser = process.env.REACT_APP_API_URL + "/users";

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
