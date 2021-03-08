import axios from "axios";
import CookieManager from "./cookieManager";

const url = "http://localhost:4000/users/";

export const userLogin = async (email, password) => {
  try {
    const login = await axios.post(url + "login", {
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
    const register = await axios.post(url, {
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

export const readProfile = async (options) => {
  try {
    const data = await axios.get(url + "me", CookieManager());

    return data.name;
  } catch (e) {
    console.log(e);
  }
};

export const userUpdate = async (name) => {
  try {
    await axios.patch(
      url + "me",
      {
        name,
      },
      CookieManager()
    );
  } catch (e) {
    console.log(e);
  }
};

export const disconnectAll = async () => {
  try {
    await axios.post(url + "logoutAll", {}, CookieManager());
  } catch (e) {
    console.log(e);
  }
};

export const deleteAccount = async () => {
  try {
    await axios.delete(url + "me", CookieManager());
    CookieManager("");
  } catch (e) {
    console.log(e);
  }
};
