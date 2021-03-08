import CookieManager from "./cookieManager";
import axiosInstance from "../apiRoutes/axiosInstance";

export const userLogin = async (email, password) => {
  try {
    const login = await axiosInstance("user").post("/login", {
      email: email,
      password: password,
    });

    CookieManager(await login.data.token);
    const name = login.data.user.name;

    return name;
  } catch (e) {
    console.log(e);
  }
};

export const userRegister = async (name, email, password) => {
  try {
    const register = await axiosInstance("user").post("/", {
      name,
      email,
      password,
    });

    CookieManager(await register.data.token);

    const newName = register.data.user.name;

    return newName;
  } catch (e) {
    console.log(e);
  }
};

export const readProfile = async () => {
  try {
    const data = await axiosInstance("user").get("/me");
    return data.data.name;
  } catch (e) {
    console.log(e);
  }
};

export const userUpdate = async (name) => {
  try {
    await axiosInstance("user").patch("/me", {
      name,
    });
  } catch (e) {
    console.log(e);
  }
};

export const disconnectAll = async () => {
  try {
    await axiosInstance("user").post("/logoutAll");
  } catch (e) {
    console.log(e);
  }
};

export const deleteAccount = async () => {
  try {
    await axiosInstance("user").delete("/me");
    CookieManager("");
  } catch (e) {
    console.log(e);
  }
};
