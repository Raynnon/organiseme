import Cookies from "universal-cookie";

const CookieManager = (token) => {
  const cookies = new Cookies();

  if (token && token !== "delete") {
    cookies.set("token", token);
  } else if (token === "delete") {
    cookies.remove("token");
  } else {
    return cookies.get("token");
  }
};

export default CookieManager;
