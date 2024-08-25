import axios from "axios";
import Cookies from "js-cookie";
const basicURL = "http://127.0.0.1:8000/api/";

export const login = async (email, password) => {
  try {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");
    }

    const response = await axios.post(basicURL + "admin/login", {
      email: email,
      password: password,
    });

    // Setting cookies
    Cookies.set("token_resta", response.data.access_token);
    Cookies.set("admin_resta", JSON.stringify(response.data.customer));

    return response.data;
  } catch (error) {
    return error.response?.data;
  } finally {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.remove("show");
    }
  }
};

export const logout = () => {
  return new Promise((resolve) => {
    Cookies.remove("token_resta");
    Cookies.remove("admin_resta");
    resolve({ message: "Logged out successfully" });
  });
};

export const getUser = () => {
  const user = Cookies.get("admin_resta");
  return user ? JSON.parse(user) : null;
};

export const isAuth = () => {
  return !!Cookies.get("token_resta");
};
