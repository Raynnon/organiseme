import axios from "axios";

const url = "http://localhost:4000/users/";
let token = "";
let options = {};

export const userLogin = async (email, password) => {
  try {
    const login = await axios.post(url + "login", {
      email: email,
      password: password,
    });

    token = await login.data.token;

    options = {
      headers: { Authorization: "Bearer " + token },
    };

    return { token, options };
  } catch (e) {
    console.log(e);
  }
};
