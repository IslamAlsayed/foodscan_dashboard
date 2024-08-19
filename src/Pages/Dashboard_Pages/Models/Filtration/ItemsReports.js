import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";

export default function ItemsReports({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [itemsReports, setItemsReports] = useState({
    date: "",
    payment_method: "",
    order_id: "",
    amount: "",
  });
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChange = (e) => {
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));
    const { name, value } = e.target;
    if (name === "data") {
      setItemsReports((prevData) => ({
        ...prevData,
        data: formatDate(value),
      }));
    } else {
      setItemsReports({ ...itemsReports, [name]: value });
    }
  };

  function formatDate(dateString) {
    return new Date(dateString)
      .toLocaleString("sv-SE", { timeZone: "UTC" })
      .replace("T", " ");
  }

  const handleSearch = () => {
    const { data, payment_method, order_id, amount } = itemsReports;
    const filtered = filteredData.filter((item) => {
      return (
        (!data || item.data <= data) &&
        (!payment_method ||
          item.payment_method
            .toLowerCase()
            .includes(payment_method.toLowerCase())) &&
        (order_id === "" || item.order_id === parseInt(order_id)) &&
        (amount === "" || item.amount === parseInt(amount))
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setItemsReports({
      date: "",
      payment_method: "",
      order_id: "",
      amount: "",
    });
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));
    filtrated(JSON.parse(sessionStorage.getItem("origin_data")));
  };

  return (
    <div className="headerTable">
      <ActionsFilter
        handleModalToggle={handleModalToggle}
        data={data}
        headers={headers}
      />

      <div
        className="itemsReports FiltrationModel collapse"
        id="collapseTarget"
      >
        <div className="row pb-4">
          <div className="row mt-3">
            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="date"
                id="date"
                value={itemsReports.date}
                onChange={handleChange}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">payment method</label>
              <select
                className="form-control"
                name="payment_method"
                id="payment_method"
                value={itemsReports.payment_method}
                onChange={handleChange}
              >
                <option value="" selected disabled>
                  --
                </option>
                <option value="cashed">cashed</option>
                <option value="VisaMasterCard">VisaMasterCard</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">order id</label>
              <input
                type="number"
                className="form-control"
                name="order_id"
                id="order_id"
                value={itemsReports.order_id}
                onChange={handleChange}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label className="mb-2">amount</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                id="amount"
                value={itemsReports.amount}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col col-3 d-flex gap-3">
              <button
                type="search"
                className="btn btn-primary"
                onClick={handleSearch}
              >
                <FaSearch />
                <span className="ps-2">search</span>
              </button>
              <button
                type="clear"
                className="btn btn-secondary"
                onClick={handleClear}
              >
                <HiXMark />
                <span className="ps-2">clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
