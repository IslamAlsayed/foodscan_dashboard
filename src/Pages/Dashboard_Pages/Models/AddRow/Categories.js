import "../Models.css";
import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData } from "../../../../axiosConfig/API";

function Categories({ visible, updated }) {
  const imageRef = useRef(null);
  const [staticVisible, setStaticVisible] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: null,
    status: 1,
  });

  useEffect(() => {
    setStaticVisible(visible);
  }, [visible]);

  const closeModal = () => {
    setStaticVisible(false);
    document.body.style.overflow = "visible";
  };

  const handleChange = (e) => {
    const { name, value, id, type, files } = e.target;
    setCategory((prevData) => {
      if (name === "status") {
        return {
          ...prevData,
          status: id === "active" ? 1 : 0,
        };
      }
      if (name === "image" && type === "file") {
        return {
          ...prevData,
          image: files[0],
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.image) formData.append("image", category.image);
    formData.append("status", category.status);

    try {
      const response = await addData("categories", formData);

      if (response.status === "success") {
        updated();
        setCategory({
          name: "",
          description: "",
          image: null,
          status: 1,
        });
        if (imageRef.current) imageRef.current.value = null;
        Swal.fire("Saved!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  return (
    <div
      id="AddTable"
      className={`Categories ${staticVisible ? "visible" : ""}`}
    >
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>
            add {window.location.pathname.replace("/admin/dashboard/", "")}
          </h3>

          <div className="closeSidebar">
            <HiXMark onClick={closeModal} />
          </div>
        </div>

        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={category.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
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
                        value={1}
                        onChange={handleChange}
                        checked={category.status === 1}
                        required
                      />
                      <label htmlFor="active">active</label>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        value={0}
                        onChange={handleChange}
                        checked={category.status === 0}
                        required
                      />
                      <label htmlFor="inactive">inactive</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control email"
                    name="image"
                    id="image"
                    ref={imageRef}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description <span className="star">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    id="description"
                    value={category.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  <HiXMark />
                  <span className="ps-2">Close</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Categories;
