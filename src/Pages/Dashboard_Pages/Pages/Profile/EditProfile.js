import "./Profile.css";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { updateData } from "../../../../axiosConfig/API";

export function EditProfile() {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    identity_card: "",
    Role: "",
    status: 1,
  });

  useEffect(() => {
    let adminCookies = JSON.parse(Cookies.get("admin_resta"));
    setEmployee(adminCookies);
  }, []);

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    setEmployee((prevData) => {
      if (name === "status") {
        return {
          ...prevData,
          status: id === "active" ? 1 : 0,
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("phone", employee.phone);
    formData.append("identity_card", employee.identity_card);
    formData.append("Role", employee.Role);
    formData.append("status", employee.status);

    try {
      const response = await updateData(
        `admin/employees/${employee.id}`,
        formData,
        "put"
      );

      if (response.status === "success") {
        if (response.data)
          Cookies.set("admin_resta", JSON.stringify(response.data));
        console.log("response.data", response.data);
        Swal.fire("Updated!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  return (
    <>
      {employee && (
        <div className="EditProfile">
          <Breadcrumb />

          <form className="formModal bg-white" onSubmit={handleSubmit}>
            <div className="title">edit profile</div>

            <div className="row">
              <div className="col col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    NAME <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={employee.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    EMAIL <span className="star">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                    disabled
                    value={employee.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    PHONE <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={employee.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col col-12 col-md-6">
                <div className="mb-3">
                  <label htmlFor="identity_card" className="form-label">
                    IDENTITY CART <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="identity_card"
                    id="identity_card"
                    value={employee.identity_card}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col col-12 col-md-6">
                <div>
                  <label htmlFor="Role" className="form-label">
                    ROLE <span className="star">*</span>
                  </label>

                  <select
                    className="form-control"
                    name="Role"
                    id="Role"
                    required
                    onChange={handleChange}
                  >
                    <option
                      value="chef"
                      disabled
                      selected={employee.Role === "chef"}
                    >
                      chef
                    </option>
                    <option value="admin" selected={employee.Role === "admin"}>
                      admin
                    </option>
                    <option
                      value="casher"
                      disabled
                      selected={employee.Role === "casher"}
                    >
                      casher
                    </option>
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="active" className="form-label">
                    status <span className="star">*</span>
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        required
                        value="1"
                        checked={employee.status === 1}
                        onChange={handleChange}
                      />
                      <label htmlFor="active">active</label>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        required
                        value="0"
                        checked={employee.status === 0}
                        onChange={handleChange}
                      />
                      <label htmlFor="inactive">in active</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">save</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
