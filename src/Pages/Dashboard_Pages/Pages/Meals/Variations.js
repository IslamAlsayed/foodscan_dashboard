import "../SubModels.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Table, Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData, getData } from "../../../../axiosConfig/API";

export default function Variations({ order_id }) {
  const { id } = useParams();
  const componentRef = useRef();
  const [variations, setVariations] = useState();
  const [size, setSize] = useState([
    { value: 1, label: "small" },
    { value: 2, label: "medium" },
    { value: 3, label: "big" },
    { value: 4, label: "family" },
  ]);
  const [meal, setMeal] = useState({
    size: "",
    number_of_piece: "",
    cost: "",
    meal_id:id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal({ ...meal, [name]: value });
  };

  const fetchVariations = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/meals/${id}/size-costs`);
      const sizesInResult = result.map((record) => record.size);

      const updatedSize = size.filter(
        (item) => !sizesInResult.includes(item.value)
      );
      setSize(updatedSize);

      const updatedResult = result.map((record) => {
        let size;
        switch (record.size) {
          case 1:
            size = "small";
            break;
          case 2:
            size = "medium";
            break;
          case 3:
            size = "big";
            break;
          case 4:
            size = "family";
            break;
          default:
            size = "none";
        }

        return {
          ...record,
          size,
        };
      });
      setVariations(updatedResult);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    if (order_id) fetchVariations(order_id);
  }, [order_id, fetchVariations]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("size", meal.size);
    formData.append("number_of_piece", meal.number_of_piece);
    formData.append("cost", meal.cost);
    formData.append("meal_id", meal.meal_id);

    try {
      const response = await addData(`admin/meals/size-cost`, formData);

      if (response.status === "success") {
        fetchVariations(order_id);
        setMeal({
          size: "",
          number_of_piece: "",
          cost: "",
          meal_id:id,
        });

        Swal.fire("Saved!", response.message, "success");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message, "error");
    }
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
      dataIndex: "size",
      key: "size",
    },
  ];

  return (
    <div className="SubModel">
      {Object(size).length > 0 ? (
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
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
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
                      onChange={handleChange}
                      required
                    >
                      <option value="" selected disabled>
                        --
                      </option>
                      {size.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}

                      {/* <option value="1">small</option>
                      <option value="2">medium</option>
                      <option value="3">big</option>
                      <option value="4">family</option> */}
                    </select>
                  </div>
                </div>

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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                <FaCheckCircle />
                <span>save</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
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
