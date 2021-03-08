import Cookies from "universal-cookie";

const CookieManager = (token) => {
  const cookies = new Cookies();

  if (token && token !== "delete") {
    cookies.set("token", token);
    cookies.set("options", {
      headers: { Authorization: "Bearer " + token },
    });
  } else if (token === "delete") {
    cookies.remove("token");
    cookies.remove("options");
  } else {
    return cookies.get("options");
  }
};

export default CookieManager;
