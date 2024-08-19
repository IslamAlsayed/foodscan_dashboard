import "./styles/Login.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [adminToken, setAdminToken] = useState(null);

  const [formData, setFormData] = useState({
    email: "islam@gmail.com",
    password: "test1234",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passError: "",
    loginError: "",
  });

  const handleInputChange = (event) => {
    if (event.target.name === "email") {
      setFormData({
        ...formData,
        email: event.target.value,
      });
      setErrors({
        ...errors,
        emailError:
          event.target.value.length === 0
            ? "This Field is required"
            : !event.target.validity.valid && "Please enter a vaild email",
      });
    } else if (event.target.name === "password") {
      setFormData({
        ...formData,
        password: event.target.value,
      });
      setErrors({
        ...errors,
        passError:
          event.target.value.length === 0
            ? "This Field is required"
            : !event.target.validity.valid && "Please enter a vaild password",
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("AdminToken")) {
      history.push("/admin/dashboard");
    }
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(adminToken);

    try {
      //'http://127.0.0.1:8000/api/admin/login'
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/login",
        formData
      );
      setAdminToken(response.access_token);
      //'AdminToken'
      localStorage.setItem("AdminToken", JSON.stringify(adminToken));
      history.push("/admin/dashboard");
      //"/admin/dashboard/add-ons"
      // history.push(props.redirect);
      // console.log(response);

      setErrors({
        ...errors,
        loginError: "",
      });

      localStorage.setItem("AdminData", JSON.stringify(response.data.customer));
      localStorage.setItem(
        "AdminToken",
        JSON.stringify(response.data.access_token)
      );
      setAdminToken(JSON.parse(localStorage.getItem("AdminToken")));

      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);

      setErrors({
        ...errors,
        loginError: "invalid email or password",
      });
    }

    // localStorage.removeItem("token");

    // const validUserName = "admin";
    // const validPassword = "123";

    // if (username !== validUserName) {
    //   alert("Invalid username");
    //   return;
    // }

    // if (password !== validPassword) {
    //   alert("Invalid password");
    //   return;
    // }

    // if (username === validUserName && password === validPassword) {
    //   localStorage.setItem("token", "true");
    //   history.push("/admin/dashboard");
    // } else {
    //   alert("Invalid username or password");
    //   return;
    // }
  };

  return (
    <div className="formUser">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email pb-2">email (islam@gmail.com)</label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password pb-2">password (test1234)</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-2 w-100"
                  >
                    Login
                  </button>
                </div>
                <div className="changeRoute form-class-ext-center text-dark">
                  <a href="" className="text-dark fw-bold">
                    <Link to="/auth/resetpassword">forget password ?</Link>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
