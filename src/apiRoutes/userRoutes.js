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
