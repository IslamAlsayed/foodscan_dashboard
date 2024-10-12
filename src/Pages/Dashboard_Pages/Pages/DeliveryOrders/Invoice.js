import "./Invoice.css";
import React, { useCallback, useEffect, useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getData } from "../../../../axiosConfig/API";

export default function Invoice({ visible, modalClose }) {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [meals, setMeals] = useState([]);
  const [addons, setAddons] = useState([]);
  const [extras, setExtras] = useState([]);
  const [cartItemTotal, setCartItemTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/orders/${id}`);
      setOrder(result);
      setMeals(result.order_meals);
      setAddons(result.order_addons);
      setExtras(result.order_extras);
      setLoading(false);
      if (document.getElementById("Loader")) {
        document.getElementById("Loader").classList.remove("show");
      }
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchOrder(id);
  }, [id, fetchOrder]);

  useEffect(() => {
    let totalCost = 0;
    if (meals) {
      meals.forEach((meal) => {
        totalCost += meal.total_cost;
      });
    }
    if (addons) {
      addons.forEach((addon) => {
        totalCost += addon.total_cost;
      });
    }
    if (extras) {
      extras.forEach((extra) => {
        totalCost += extra.total_cost;
      });
    }

    setCartItemTotal(totalCost.toFixed(2));
  }, [meals]);

  if (loading) return;

  return (
    <div className={`modal-overlay invoice ${visible ? "visible" : ""}`}>
      <div className="modal-container">
        <div className="modal-content">
          <div className="options">
            <button className="btn btn-danger" onClick={modalClose}>
              cancel
            </button>
            <button className="btn btn-success" onClick={() => window.print()}>
              <PrinterOutlined />
              print invoice
            </button>
          </div>

          <div className="message-qrCode">
            <div>resta</div> - restaurant menu maker and contactless menu
            ordering system
          </div>

          <div className="restaurant-address">
            <p>{"house:25, road no:2, block a, mirpur-1, dhaka 1216"}</p>
            <p>tel: {"+4545344545"}</p>
          </div>

          <div className="id_date">
            <p>
              <span>order id</span>
              <span>{order.id}</span>
            </p>
            <p>
              <span>
                {new Date(order.created_at).toLocaleDateString("sv-SE", {
                  timeZone: "UTC",
                })}
              </span>
              <span>
                {new Date(order.created_at).toLocaleTimeString("sv-SE", {
                  timeZone: "UTC",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </p>
          </div>

          <div className="menu">
            <table>
              <thead>
                <tr>
                  <th key="0">qty</th>
                  <th key="1">item description</th>
                  <th key="2">price</th>
                </tr>
              </thead>

              {meals ? (
                meals.map((item, index) => (
                  <>
                    <tbody className="item" key={index}>
                      <tr>
                        <td>x {item.quantity}</td>
                        <td>
                          <span>{item.meal.name}</span>
                        </td>
                        <td>${item.total_cost}</td>
                      </tr>

                      {Object(addons).length > 0
                        ? addons.map((addon, index) => (
                            <tr className="addons" key={index}>
                              <td>x {addon.quantity}</td>
                              {index < 1 ? (
                                <td>addon: {addon.addon.name}</td>
                              ) : (
                                <td>~~~~ : {addon.addon.name}</td>
                              )}
                              <td>${addon.total_cost}</td>
                            </tr>
                          ))
                        : false}

                      {Object(extras).length > 0
                        ? extras.map((extra, index) => (
                            <tr className="extras" key={index}>
                              <td>x {extra.quantity}</td>
                              {index < 1 ? (
                                <td>extra: {extra.extra.name}</td>
                              ) : (
                                <td>~~~ : {extra.extra.name}</td>
                              )}
                              <td>${extra.total_cost}</td>
                            </tr>
                          ))
                        : false}
                    </tbody>
                  </>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td>--</td>
                    <td>--</td>
                    <td>--</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <div className="total">
            <div className="row">
              <div className="col">SUBTOTAL</div>
              <div className="col">${cartItemTotal}</div>
            </div>

            <div className="row">
              <div className="col">TOTAL TAX</div>
              <div className="col">${"0.00"}</div>
            </div>

            <div className="row">
              <div className="col">DISCOUNT</div>
              <div className="col">{"0"}</div>
            </div>

            <div className="row fw-bold">
              <div className="col">TOTAL</div>
              <div className="col">${cartItemTotal}</div>
            </div>
          </div>

          <div className="payment">payment type cash</div>

          <div className="messageThank">
            <p>thank you</p>
            <p>please come again</p>
          </div>

          <div className="powered_by">
            <label>powered_by</label>
            <div>resta</div> - restaurant menu maker and contactless menu
            ordering system
          </div>
        </div>
      </div>
    </div>
  );
}
