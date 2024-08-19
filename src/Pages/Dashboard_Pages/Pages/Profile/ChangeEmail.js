import "./Profile.css";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import { updateData } from "../../../../axiosConfig/API";

export function ChangeEmail() {
  const [old_email, setOld_email] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const adminData = JSON.parse(localStorage.getItem("adminData") || {});

  useEffect(() => {
    if (adminData) {
      setOld_email(adminData.email);
      setEmail("");
      setPassword("");
    }
  }, [adminData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!old_email || !email || !password) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (old_email === email) {
      setErrorMessage("The new email must be different from the old email.");
      return;
    }

    try {
      const response = await updateData(
        "admin/employees/change-email",
        {
          old_email: old_email,
          email: email,
          password: password,
        },
        "patch"
      );

      if (response.status === "success") {
        setMessage(response.data.message);
        setOld_email("");
        setEmail("");
        setPassword("");
        setErrorMessage("");

        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message || "An error occurred");
      if (error.response && error.response.status === 422) {
        Swal.fire("Error!", "Validation error occurred.", "error");
      } else {
        Swal.fire(
          "Error!",
          error.response.data.message || "An error occurred",
          "error"
        );
      }
    }
  };

  return (
    <div className="ChangeEmail">
      <Breadcrumb />

      <form onSubmit={handleSubmit} className="formModal bg-white">
        {message && <div className="alert alert-success">{message}</div>}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <div className="title">Change Email</div>

        <div className="row">
          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="old_email" className="form-label">
                OLD EMAIL <span className="star">*</span>
              </label>
              <input
                type="email"
                className="form-control email"
                name="old_email"
                id="old_email"
                value={old_email}
                disabled
                onChange={(e) => setOld_email(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                NEW EMAIL <span className="star">*</span>
              </label>
              <input
                type="email"
                className="form-control email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col col-12 col-md-7">
            <div>
              <label htmlFor="password" className="form-label">
                PASSWORD <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">Update</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
