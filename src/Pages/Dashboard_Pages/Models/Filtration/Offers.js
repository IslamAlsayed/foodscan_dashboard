import React, { useState, useEffect } from "react";
import { HiXMark } from "react-icons/hi2";
import ActionsFilter from "./ActionsFilter";
import { FaSearch } from "react-icons/fa";

export default function Offers({
  handleModalToggle,
  data,
  headers,
  filtrated,
}) {
  const [offers, setOffers] = useState({
    name: "",
    discount: "",
    start_date: "",
    end_date: "",
    status: "",
  });
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChange = (e) => {
    setFilteredData(JSON.parse(sessionStorage.getItem("origin_data")));

    const { name, value, id } = e.target;
    if (name === "status") {
      setOffers((prevData) => ({
        ...prevData,
        status: id === "active" ? 1 : 0,
      }));
    } else if (name === "start_date") {
      setOffers((prevData) => ({
        ...prevData,
        start_date: formatDate(value),
      }));
    } else if (name === "end_date") {
      setOffers((prevData) => ({
        ...prevData,
        end_date: formatDate(value),
      }));
    } else if (name === "type") {
      setOffers((prevData) => ({
        ...prevData,
        type: id === "vegetarian" ? "vegetarian" : "non-vegetarian",
      }));
    } else {
      setOffers({ ...offers, [name]: value });
    }
  };

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("sv-SE", {
      timeZone: "UTC",
    });
  }

  const handleSearch = () => {
    const { name, start_date, end_date, discount, status } = offers;
    const filtered = filteredData.filter((item) => {
      const itemStartDate = new Date(item.start_date + "T00:00:00");
      const itemEndDate = new Date(item.end_date + "T23:59:59");
      const startDateInput = new Date(start_date + "T00:00:00");
      const endDateInput = new Date(end_date + "T23:59:59");

      return (
        (!name || item.name.toLowerCase().includes(name.toLowerCase())) &&
        (start_date === "" || itemStartDate >= startDateInput) &&
        (end_date === "" || itemEndDate <= endDateInput) &&
        (discount === "" || item.discount === parseFloat(discount)) &&
        (status === "" || item.status === parseInt(status))
      );
    });

    setFilteredData(filtered);
    filtrated(filtered);
  };

  const handleClear = () => {
    setOffers({
      name: "",
      discount: "",
      start_date: "",
      end_date: "",
      status: "",
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

      <div className="Offers FiltrationModel collapse" id="collapseTarget">
        <div className="row pb-4">
          <div className="row mt-3">
            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="name" className="mb-2">
                name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={offers.name}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="discount" className="mb-2">
                discount
              </label>
              <input
                type="number"
                className="form-control"
                name="discount"
                id="discount"
                value={offers.discount}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="start_date" className="mb-2">
                start data
              </label>
              <input
                type="date"
                className="form-control"
                name="start_date"
                id="start_date"
                value={offers.start_date}
                onChange={handleChange}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-3 mb-3">
              <label htmlFor="end_date" className="mb-2">
                end data
              </label>
              <input
                type="date"
                className="form-control"
                name="end_date"
                id="end_date"
                value={offers.end_date}
                onChange={handleChange}
              />
            </div>

            <div className="col col-12 col-md-6 col-lg-4 mb-3">
              <label htmlFor="status" className="mb-2">
                status
              </label>
              <div className="d-flex gap-2 align-items-center">
                <input
                  type="radio"
                  name="status"
                  id="active"
                  checked={offers.status === 1}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="active">active</label>
                <input
                  type="radio"
                  name="status"
                  id="inactive"
                  checked={offers.status === 0}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="inactive">inactive</label>
              </div>
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
