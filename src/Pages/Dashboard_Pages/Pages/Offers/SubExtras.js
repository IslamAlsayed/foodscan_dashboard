import "../SubModels.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import { getData, addData, updateData } from "../../../../axiosConfig/API";
import DeleteRecord from "../Actions/DeleteRecord";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FiEdit } from "react-icons/fi";
import { PlusCircleFilled } from "@ant-design/icons";

export default function SubExtras({ order_id }) {
  const componentRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsExtras, setOptionsExtras] = useState();
  const [extras, setExtras] = useState();
  const [newExtra, setNewExtra] = useState({
    offer_id: order_id,
    extra_id: "",
    extra_quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewExtra((prevData) => ({ ...prevData, [name]: parseInt(value) }));
  };

  const fetchExtras = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/offers/${id}/extras`);
      setExtras(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchOptionsExtras = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/extras`);
      setOptionsExtras(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    if (order_id) fetchExtras(order_id);
    if (order_id) fetchOptionsExtras(order_id);
  }, [order_id, fetchExtras, fetchOptionsExtras]);

  useEffect(() => {
    const modalElement = document.getElementById("addExtra");
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
    formData.append("offer_id", newExtra.offer_id);
    formData.append("extra_id", newExtra.extra_id);
    formData.append("extra_quantity", newExtra.extra_quantity);

    try {
      let response;
      const method = e.target._method.value;

      if (method === "update") {
        formData.append("_method", "put");
        response = await updateData(
          `admin/offers/${order_id}/extras/${newExtra.extra_id}`,
          formData,
          false
        );
      } else {
        response = await addData("admin/offers/extras", formData);
      }

      if (response.status === "success") {
        fetchExtras(order_id);
        fetchOptionsExtras(order_id);
        if (method === "add") {
          setNewExtra({
            offer_id: order_id,
            extra_id: "",
            extra_quantity: "",
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

  const handleEdit = (extra) => {
    setNewExtra({
      offer_id: order_id,
      extra_id: extra.id,
      extra_quantity: extra.quantity,
    });
    setModalVisible(!modalVisible);
  };

  const handleClose = () => {
    setNewExtra({
      offer_id: order_id,
      extra_id: "",
      extra_quantity: "",
    });
    setModalVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
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
        <span className={item.status === 1 ? "active" : "inactive"}>
          {item.status === 1 ? "active" : "inactive"}
        </span>
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
            url={`admin/offers/${order_id}/extras/${item.id}`}
            refreshed={() => fetchExtras(order_id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="SubModel">
      <div className="head">
        <div>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addExtra"
          >
            <PlusCircleFilled />
            <span>add extras</span>
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="addExtra"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addExtraLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addExtraLabel">
                {modalVisible ? "update" : "add"} extra
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
                    <label htmlFor="extra_id" className="form-label">
                      Name <span className="star">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="extra_id"
                      id="extra_id"
                      required
                      value={newExtra.extra_id}
                      onChange={(e) => handleChange(e)}
                      disabled={modalVisible}
                    >
                      {!modalVisible && (
                        <option value="" disabled selected>
                          --
                        </option>
                      )}
                      {optionsExtras &&
                        optionsExtras.map((extra) => (
                          <option value={extra.id} key={extra.id}>
                            {extra.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="extra_quantity" className="form-label">
                      Quantity <span className="star">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="extra_quantity"
                      id="extra_quantity"
                      required
                      value={newExtra.extra_quantity}
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
                <FaCheckCircle />
                <span>{modalVisible ? "update" : "save"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="DataTable mt-3">
        <div className="tableItems" ref={componentRef}>
          <Table
            columns={columns}
            dataSource={extras}
            pagination={Object(extras).length > 10}
          />
        </div>
      </div>
    </div>
  );
}
