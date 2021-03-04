import axios from "axios";

const url = "http://localhost:4000/users/";
let token = "";
let name = "";
let options = {};

export const userLogin = async (email, password) => {
  try {
    const login = await axios.post(url + "login", {
      email: email,
      password: password,
    });

    token = await login.data.token;
    name = await login.data.user.name;

    options = {
      headers: { Authorization: "Bearer " + token },
    };

    return { token, name, options };
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

    token = register.data.token;
    name = register.data.user.name;

    options = {
      headers: { Authorization: "Bearer " + token },
    };

    return { token, name, options };
  } catch (e) {
    console.log(e);
  }
};

export const userUpdate = async (data, options) => {
  if (data.username) {
    try {
      await axios.patch(
        url + "me",
        {
          name: data.username,
        },
        options
      );
    } catch (e) {
      console.log(e);
    }
  } else if (data.password) {
  }
};

export const disconnectAll = async (options) => {
  try {
    await axios.post(url + "logoutAll", {}, options);
  } catch (e) {
    console.log(e);
  }
};

export const deleteAccount = async (options) => {
  try {
    await axios.delete(url + "me", options);
  } catch (e) {
    console.log(e);
  }
};
