import "../SubModels.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Table, Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { Modal } from "bootstrap";
import { addData, getData, updateData } from "../../../../axiosConfig/API";
import { FiEdit } from "react-icons/fi";

export default function Variations({ order_id }) {
  const { id } = useParams();
  const componentRef = useRef();
  const [variations, setVariations] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const [sizeList, setSizeList] = useState([
    { value: 1, label: "small" },
    { value: 2, label: "medium" },
    { value: 3, label: "big" },
    { value: 4, label: "family" },
  ]);

  const [meal, setMeal] = useState({
    size: "",
    number_of_piece: "",
    cost: "",
    meal_id: id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal({ ...meal, [name]: value });
  };

  const fetchVariations = useCallback(async (order_id) => {
    if (!order_id) return;
    try {
      const result = await getData(`admin/meals/${id}/size-costs`);
      const sizesInResult = result.map((record) => record.size);
      const updatedSize = sizeList.filter(
        (item) => !sizesInResult.includes(item.value)
      );
      setSizeList(updatedSize);
      setVariations(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchVariations(order_id);
  }, [order_id, fetchVariations]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("size", meal.size);
    formData.append("number_of_piece", meal.number_of_piece);
    formData.append("cost", meal.cost);
    formData.append("meal_id", meal.meal_id);

    try {
      let response;
      const method = e.target._method.value;

      if (method === "update") {
        response = await updateData(
          `admin/meals/${meal.meal_id}/size-cost`,
          formData,
          false
        );
      } else {
        response = await addData(`admin/meals/size-cost`, formData);
      }

      if (response.status === "success") {
        fetchVariations(order_id);
        setMeal({
          size: "",
          number_of_piece: "",
          cost: "",
          meal_id: id,
        });

        setTimeout(() => {
          Swal.fire(
            method === "update" ? "Updated!" : "Saved!",
            response.message,
            "success"
          );
        }, 250);
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
  };

  const handleEdit = (item) => {
    setMeal(item);
    setModalVisible(true);
  };

  const handleClose = () => {
    setMeal([]);
    setModalVisible(false);
  };

  useEffect(() => {
    const modalElement = document.getElementById("addVariations");
    if (modalElement) {
      const myModal = new Modal(modalElement);
      if (modalVisible) {
        myModal.show();
      } else {
        myModal.hide();
      }
    }
  }, [modalVisible]);

  const convert = (value) => {
    return value === 1
      ? "small"
      : value === 2
      ? "medium"
      : value === 3
      ? "big"
      : value === 4
      ? "family"
      : "none";
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "PRICE",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "SIZE",
      key: "size",
      render: (item) => convert(item.size),
    },
    {
      title: "ACTION",
      key: "action",
      render: (item) => (
        <Link
          to="#"
          className="editIcon"
          data-tooltip="edit"
          onClick={() => handleEdit(item)}
          style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
        >
          <FiEdit />
        </Link>
      ),
    },
  ];

  return (
    <div className="SubModel">
      {Object(sizeList).length > 0 ? (
        <Row gutter={16}>
          <Col span={16}>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addVariations"
            >
              add variations
            </button>
          </Col>
        </Row>
      ) : (
        false
      )}

      <div
        className="modal fade"
        id="addVariations"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addVariationsLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addVariationsLabel">
                add variations
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {Object(sizeList).length > 0 && (
                  <div className="col col-12 col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="size" className="form-label">
                        SIZE <span className="star">*</span>
                      </label>
                      <select
                        className="form-control"
                        name="size"
                        id="size"
                        value={meal.size}
                        onChange={(e) => handleChange(e)}
                        required
                      >
                        <option value="" selected>
                          --
                        </option>
                        {sizeList.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="number_of_piece" className="form-label">
                      NUMBER OF PIECE <span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="number_of_piece"
                      id="number_of_piece"
                      value={meal.number_of_piece}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="cost" className="form-label">
                      COST <span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="cost"
                      id="cost"
                      value={meal.cost}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <input
                type="hidden"
                name="_method"
                id="_method"
                value={modalVisible ? "update" : "add"}
              />

              <button type="submit" className="btn btn-primary">
                <FaCheckCircle />
                <span>save</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                <HiXMark />
                <span>cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="DataTable mt-3">
        <div className="tableItems" ref={componentRef}>
          <Table
            columns={columns}
            dataSource={variations}
            pagination={Object(variations).length > 9}
          />
        </div>
      </div>
    </div>
  );
}
