import axios from "axios";
import Cookies from "js-cookie";
export const basicURL = "http://127.0.0.1:8000/api/";
export const imageStorageURL = "http://127.0.0.1:8000/storage";

export const getData = async (url) => {
  try {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");
    }

    const response = await axios.get(basicURL + url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token_resta") || null}`,
      },
    });

    if (response) {
      if (document.getElementById("Loader")) {
        document.getElementById("Loader").classList.remove("show");
      }
    }

    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

export const addData = async (url, data) => {
  try {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");
    }

    const response = await axios.post(basicURL + url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${Cookies.get("token_resta") || null}`,
      },
    });

    if (response) {
      if (document.getElementById("Loader")) {
        document.getElementById("Loader").classList.remove("show");
      }
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

export const updateData = async (url, data, multipart, method = "post") => {
  try {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");
    }

    const response = await axios({
      method: method,
      url: basicURL + url,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": multipart ? "multipart/form-data" : false,
        Authorization: `Bearer ${Cookies.get("token_resta") || null}`,
      },
    });

    if (response) {
      if (document.getElementById("Loader")) {
        document.getElementById("Loader").classList.remove("show");
      }
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};

export const deleteData = async (url) => {
  try {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");
    }

    const response = await axios.delete(basicURL + url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Cookies.get("token_resta") || null}`,
      },
    });

    if (response) {
      if (document.getElementById("Loader")) {
        document.getElementById("Loader").classList.remove("show");
      }
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
    } else {
      console.error("Error occurred:", error.message);
    }
    throw error;
  }
};
