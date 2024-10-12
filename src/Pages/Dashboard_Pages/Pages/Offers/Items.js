import "./Models.css";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { Modal } from "bootstrap";
import { PlusCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useCallback, useEffect, useState } from "react";
import { addData, getData, updateData } from "../../../../axiosConfig/API";
import { HiXMark } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import DeleteRecord from "../Actions/DeleteRecord";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";

export default function Address({ id }) {
  const [items, setItems] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listMeal, setListMeal] = useState([]);
  const [sizeList, setSizeList] = useState([1, 2, 3, 4]);
  const [meal, setMeal] = useState({
    offer_id: id,
    meal_id: "",
    meal_size: "",
    meal_quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "meal_id") {
      const single_meal = listMeal.find((meal) => meal.id == value);
      if (single_meal) {
        setSizeList(single_meal.size);
      }
    }

    setMeal((prevMeal) => ({ ...prevMeal, [name]: parseInt(value) }));
  };

  const fetchOfferMeal = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/offers/${id}/meals`);
      setItems(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchOfferMeal(id);
  }, [id, fetchOfferMeal]);

  const fetchListMeal = useCallback(async () => {
    try {
      const result = await getData("admin/meals-with-sizes");
      setListMeal(result);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  }, []);

  useEffect(() => {
    fetchListMeal();
  }, [fetchListMeal]);

  const convert = (value) => {
    switch (value) {
      case 1:
        return "small";
      case 2:
        return "medium";
      case 3:
        return "big";
      case 4:
        return "family";
      default:
        return "none";
    }
  };

  useEffect(() => {
    const modalElement = document.getElementById("addOfferItem");
    if (modalElement) {
      const myModal = new Modal(modalElement);
      if (modalVisible) {
        myModal.show();
      } else {
        myModal.hide();
      }
    }
  }, [modalVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("offer_id", meal.offer_id);
    formData.append("meal_id", meal.meal_id);
    formData.append("meal_size", meal.meal_size);
    formData.append("meal_quantity", meal.meal_quantity);

    try {
      let response;
      const method = e.target._method.value;

      if (method === "update") {
        formData.append("_method", "put");
        response = await updateData(
          `admin/offers/${id}/meals/${meal.meal_id}`,
          formData,
          false
        );
      } else {
        response = await addData("admin/offers/meals", formData);
      }

      if (response.status === "success") {
        fetchOfferMeal(id);

        if (method === "add") {
          setMeal({
            offer_id: id,
            meal_id: "",
            meal_size: "",
            meal_quantity: "",
          });
        }

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

  const handleEdit = (meal) => {
    setMeal({
      offer_id: id,
      meal_id: meal.id,
      meal_size: meal.size,
      meal_quantity: meal.quantity,
    });
    setModalVisible(!modalVisible);
  };

  const handleClose = () => {
    setMeal({
      offer_id: id,
      meal_id: "",
      meal_size: "",
      meal_quantity: "",
    });
    setModalVisible(false);
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SIZE",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "STATUS",
      key: "status",
      render: (item) => (
        <UpdateMultiStatus
          url={`admin/offers/${item.id}`}
          item={item}
          updated={fetchOfferMeal}
          list={[
            { value: 1, label: "active" },
            { value: 0, label: "inactive" },
          ]}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (item) => (
        <>
          <Link
            to="#"
            className="editIcon"
            data-tooltip="edit"
            onClick={() => handleEdit(item)}
            style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
          >
            <FiEdit />
          </Link>
          <DeleteRecord
            url={`admin/offers/${id}/meals/${item.id}`}
            refreshed={() => fetchOfferMeal(id)}
          />
        </>
      ),
    },
  ];

  if (loading) return <p>loading...</p>;

  return (
    <div className="Address">
      <div className="content">
        <div className="head">
          <div>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addOfferItem"
            >
              <PlusCircleFilled />
              <span>add meals</span>
            </button>
          </div>
        </div>

        <div className="body">
          <Table
            columns={columns}
            dataSource={items}
            pagination={Object(items).length > 10}
          />
        </div>
      </div>

      <div
        className="modal fade"
        id="addOfferItem"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addOfferItemLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addOfferItemLabel">
                {modalVisible ? "update" : "add"} meals
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
                {listMeal.length > 0 && (
                  <div className="col col-12 col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="meal_id" className="form-label">
                        Meal
                      </label>
                      <select
                        className="form-control"
                        name="meal_id"
                        id="meal_id"
                        value={meal.meal_id}
                        onChange={(e) => handleChange(e)}
                        required
                        disabled={modalVisible}
                      >
                        {!modalVisible && (
                          <option value="" disabled selected>
                            --
                          </option>
                        )}
                        {listMeal.map((meal) => (
                          <option value={meal.id} key={meal.id}>
                            {meal.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="meal_size" className="form-label">
                      SIZE
                    </label>
                    <select
                      className="form-control"
                      name="meal_size"
                      id="meal_size"
                      value={meal.meal_size}
                      onChange={(e) => handleChange(e)}
                      required
                      disabled={modalVisible}
                    >
                      {!modalVisible && (
                        <option value="" disabled selected>
                          --
                        </option>
                      )}
                      {sizeList.map((size) => (
                        <option value={size} key={size}>
                          {convert(size)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="meal_quantity" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="meal_quantity"
                      id="meal_quantity"
                      value={meal.meal_quantity}
                      onChange={(e) => handleChange(e)}
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
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                <HiXMark />
                <span>cancel</span>
              </button>
              <button type="submit" className="btn btn-primary">
                <CheckCircleFilled />
                <span>{modalVisible ? "update" : "save"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
