import "./Profile.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import { updateData } from "../../../../axiosConfig/API";

export function ChangePassword() {
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [new_password_confirmation, setNew_password_confirmation] =
    useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const adminData = JSON.parse(localStorage.getItem("adminData") || {});

  useEffect(() => {
    if (adminData) {
      setOld_password("");
      setNew_password("");
      setNew_password_confirmation("");
    }
  }, [adminData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!old_password || !new_password || !new_password_confirmation) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (new_password !== new_password_confirmation) {
      setErrorMessage(
        "The new password and password confirmation do not match."
      );
      return;
    }

    try {
      const response = await updateData(
        "admin/employees/change-password",
        {
          old_password: old_password,
          new_password: new_password,
          new_password_confirmation: new_password_confirmation,
        },
        "patch"
      );

      if (response.status === "success") {
        setMessage(response.message);
        setOld_password("");
        setNew_password("");
        setNew_password_confirmation("");
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
    <div className="ChangePassword">
      <Breadcrumb />
      <form onSubmit={handleSubmit} className="formModal bg-white">
        {message && <div className="alert alert-success">{message}</div>}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        <div className="title">change password</div>

        <div className="row">
          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="old_password" className="form-label">
                OLD PASSWORD <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="old_password"
                id="old_password"
                value={old_password}
                onChange={(e) => setOld_password(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col col-12 col-md-7">
            <div className="mb-3">
              <label htmlFor="new_password" className="form-label">
                NEW PASSWORD <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="new_password"
                id="new_password"
                value={new_password}
                onChange={(e) => setNew_password(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col col-12 col-md-7">
            <div>
              <label htmlFor="new_password_confirmation" className="form-label">
                PASSWORD CONFIRMATION <span className="star">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="new_password_confirmation"
                id="new_password_confirmation"
                value={new_password_confirmation}
                onChange={(e) => setNew_password_confirmation(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col d-flex gap-3">
            <button type="submit" className="btn btn-primary">
              <FaCheckCircle />
              <span className="ps-2">update</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
