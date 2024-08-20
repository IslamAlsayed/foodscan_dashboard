import "./Pos.css";
import "../DataTable.css";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AiFillShopping } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import subMenuItems from "../../store/subMenu";
import AddCustomer from "./Features/AddCustomer";
import CartItems from "./Features/CartItems";
import DetailsItem from "./Features/DetailsItem";
import { getData } from "../../../../axiosConfig/API";
import Invoice from "./Features/Invoice";
import MoreDetails from "./Features/MoreDetails";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Pos() {
  const [meals, setMeals] = useState([]);
  const [cartItemTotal, setCartItemTotal] = useState(0);

  const fetchMenuItem = useCallback(async () => {
    try {
      const result = await getData("menu");
      sessionStorage.removeItem("origin_data");
      setMeals(result.meals);
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchMenuItem();
  }, [fetchMenuItem]);

  const [cartItem, setCartItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [invoiceVisible, setInvoiceVisible] = useState(false);
  const [moreDetailsData, setMoreDetailsData] = useState(null);
  const [modalMoreDetailsVisible, setModalMoreDetailsVisible] = useState(false);

  const addToCart = (item) => {
    setCartItem(item);
    setModalVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCartItem(null);
    document.body.style.overflow = "visible";
  };

  const handleInvoiceModalToggle = () => {
    setInvoiceVisible(!invoiceVisible);
    document.body.style.overflow = invoiceVisible ? "visible" : "hidden";
  };

  const handleMoreDetailsToggle = (item) => {
    setMoreDetailsData(!modalMoreDetailsVisible ? item : null);
    setModalMoreDetailsVisible(!modalMoreDetailsVisible);
    document.body.style.overflow = modalMoreDetailsVisible
      ? "visible"
      : "hidden";
  };

  const handleToggleClass = () => {
    const parent = document.getElementById("posCartItems");
    const menuItem = document.querySelector(".posMenuItem");

    if (parent) {
      const currentOverflow = window.getComputedStyle(document.body).overflow;

      if (currentOverflow === "visible" || currentOverflow === "") {
        parent.classList.add("show");
        if (menuItem) menuItem.classList.add("layout");
        document.body.style.overflow = "hidden";
      } else {
        parent.classList.remove("show");
        if (menuItem) menuItem.classList.remove("layout");
        document.body.style.overflow = "visible";
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        const parent = document.getElementById("posCartItems");
        const menuItem = document.querySelector(".posMenuItem");

        if (parent) parent.classList.remove("show");
        if (menuItem) menuItem.classList.remove("layout");

        document.body.style.overflow = "visible";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="Pos">
      <div className="posMenuItem">
        <div className="posSearch">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="search by menu item"
            />
            <button
              className="btn btn-outline-secondary iconSearch"
              type="button"
            >
              <IoIosSearch />
            </button>
          </div>
        </div>

        <div className="posContent">
          <div className="subMenu mb-4">
            <div className="cards">
              {Object(subMenuItems).length > 0 &&
                subMenuItems.map((item, index) => (
                  <Link to="./pos" className="card" key={index} id={item.id}>
                    <img src={item.image} alt={item.title} />
                    <small className="card-title">{item.title}</small>
                  </Link>
                ))}
            </div>
          </div>

          <div className="mainMenu">
            <div className="cards">
              {Object(meals).length > 0 &&
                meals.map((item, index) => (
                  <div className="card" key={index} id={item.id}>
                    <div className="card-img">
                      <img
                        src={`http://localhost:8000/storage/${item.image}`}
                        alt={item.name}
                      />
                    </div>
                    <div className="card-body p-2">
                      <p className="fw-bold pb-2">{item.name}</p>
                      <div>
                        <span className="fw-bold price">
                          ${item.meal_size_costs[0].cost}
                        </span>
                        <button
                          className="addCartBtn"
                          onClick={() => addToCart(item)}
                        >
                          <FaShoppingBag /> add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary openPosCartItems"
          onClick={handleToggleClass}
        >
          <AiFillShopping />
          <span className="fs-6 fw-bold">Total Cost - </span>
          <span className="fs-6 fw-bold">${cartItemTotal.toFixed(2)}</span>
        </button>
      </div>

      <CartItems
        toggleCart={handleToggleClass}
        modalClose={handleInvoiceModalToggle}
        total={setCartItemTotal}
        detailsItemToggle={handleMoreDetailsToggle}
      />

      {modalVisible && (
        <DetailsItem
          visible={modalVisible}
          cartItem={cartItem}
          modalClose={handleModalClose}
        />
      )}

      {invoiceVisible && (
        <Invoice
          visible={invoiceVisible}
          modalClose={handleInvoiceModalToggle}
        />
      )}

      {modalMoreDetailsVisible && (
        <MoreDetails
          visible={modalMoreDetailsVisible}
          data={moreDetailsData}
          modalClose={handleMoreDetailsToggle}
        />
      )}

      <AddCustomer />
    </div>
  );
}
