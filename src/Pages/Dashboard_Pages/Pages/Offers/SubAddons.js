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

export default function SubAddons({ order_id }) {
  const componentRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsAddons, setOptionsAddons] = useState();
  const [addons, setAddons] = useState();
  const [newAddon, setNewAddon] = useState({
    offer_id: order_id,
    addon_id: "",
    addon_quantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewAddon((prevData) => ({ ...prevData, [name]: parseInt(value) }));
  };

  const fetchAddons = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/offers/${id}/addons`);
      setAddons(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  const fetchOptionsAddons = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/addons`);
      setOptionsAddons(result);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    if (order_id) fetchAddons(order_id);
    if (order_id) fetchOptionsAddons(order_id);
  }, [order_id, fetchAddons, fetchOptionsAddons]);

  useEffect(() => {
    const modalElement = document.getElementById("addAddon");
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
    formData.append("offer_id", newAddon.offer_id);
    formData.append("addon_id", newAddon.addon_id);
    formData.append("addon_quantity", newAddon.addon_quantity);

    try {
      let response;
      const method = e.target._method.value;

      if (method === "update") {
        formData.append("_method", "put");
        response = await updateData(
          `admin/offers/${order_id}/addons/${newAddon.addon_id}`,
          formData,
          false
        );
      } else {
        response = await addData("admin/offers/addons", formData);
      }

      if (response.status === "success") {
        fetchAddons(order_id);
        fetchOptionsAddons(order_id);
        if (method === "add") {
          setNewAddon({
            offer_id: order_id,
            addon_id: "",
            addon_quantity: "",
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

  const handleEdit = (addon) => {
    setNewAddon({
      offer_id: order_id,
      addon_id: addon.id,
      addon_quantity: addon.quantity,
    });
    setModalVisible(!modalVisible);
  };

  const handleClose = () => {
    setNewAddon({
      offer_id: order_id,
      addon_id: "",
      addon_quantity: "",
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
            url={`admin/offers/${order_id}/addons/${item.id}`}
            refreshed={() => fetchAddons(order_id)}
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
            data-bs-target="#addAddon"
          >
            <PlusCircleFilled />
            <span>add addons</span>
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="addAddon"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addAddonLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addAddonLabel">
                {modalVisible ? "update" : "add"} addon
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
                    <label htmlFor="addon_id" className="form-label">
                      Name <span className="star">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="addon_id"
                      id="addon_id"
                      required
                      value={newAddon.addon_id}
                      onChange={(e) => handleChange(e)}
                      disabled={modalVisible}
                    >
                      {!modalVisible && (
                        <option value="" disabled selected>
                          --
                        </option>
                      )}
                      {optionsAddons &&
                        optionsAddons.map((addon) => (
                          <option value={addon.id} key={addon.id}>
                            {addon.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="addon_quantity" className="form-label">
                      Quantity <span className="star">*</span>
                    </label>
                    <input
                      className="form-control"
                      name="addon_quantity"
                      id="addon_quantity"
                      required
                      value={newAddon.addon_quantity}
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
            dataSource={addons}
            pagination={Object(addons).length > 10}
          />
        </div>
      </div>
    </div>
  );
}
