import "../Models.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function EditEmployee({
  visible,
  visibleToggle,
  item,
  updated,
}) {
  const [staticVisible, setStaticVisible] = useState(false);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (item) setEmployee(item);
  }, [item]);

  useEffect(() => {
    setStaticVisible(visible);
  }, [visible]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    setEmployee((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("role", employee.role);
    formData.append("phone", employee.phone);
    formData.append("password", employee.password);
    formData.append("password_confirmation", employee.password_confirmation);
    formData.append("status", employee.status);
    formData.append("_method", "put");

    try {
      const response = await updateData(
        `admin/employees/${item.id}`,
        formData,
        false
      );

      if (response.status === "success") {
        updated();
        Swal.fire("Updated!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  return (
    <div id="AddTable" className={staticVisible ? "visible" : ""}>
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>
            edit {window.location.pathname.replace("/admin/dashboard/", "")}
          </h3>
          <div className="closeSidebar">
            <HiXMark onClick={visibleToggle} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={employee.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                    value={employee.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    role
                  </label>
                  <select
                    name="role"
                    id="role"
                    value={employee.role}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="chef" selected={employee.role === "chef"}>
                      Chef
                    </option>
                    <option
                      value="cashier"
                      selected={employee.role === "cashier"}
                    >
                      Cashier
                    </option>
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={employee.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password"
                    id="password"
                    value={employee.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">
                    password confirmation
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="password_confirmation"
                    id="password_confirmation"
                    value={employee.password_confirmation}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">update</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={visibleToggle}
                >
                  <HiXMark />
                  <span className="ps-2">close</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
