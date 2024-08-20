import "./Style.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { PrinterOutlined } from "@ant-design/icons";
import { MdDateRange } from "react-icons/md";
import ImageTest from "../../../../assets/global/profile.png";
import Swal from "sweetalert2";
import { getData, updateData } from "../../../../axiosConfig/API";
import { getUser, isAuth } from "../../../../axiosConfig/Auth";

export default function Show() {
  const { id } = useParams();
  const [deliveryOrder, setDeliveryOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pay, setPay] = useState(null);
  const [status, setStatus] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (isAuth()) {
      const user = getUser();
      setUserRole(user.Role);
    }
  }, []);

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/orders/${id}`);
      setDeliveryOrder(result);
      setPay(result.pay === 1 ? "Paid" : "Not Paid");
      setStatus(result.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchOrder(id);
  }, [id, fetchOrder]);

  const handlePayChange = async (e) => {
    e.preventDefault();
    let newPay = e.target.value;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the pay order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        formData.append("pay", newPay);
        formData.append("_method", "put");

        try {
          const response = await updateData(
            `admin/orders/${id}/checkPayStatus`,
            formData,
            false
          );

          if (response.status === "success") {
            setLoading(false);
            setPay(newPay === "1" ? "Paid" : "Not Paid");
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  const handleStatusChange = async (e) => {
    e.preventDefault();
    let newStatus = e.target.value;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the status order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const formData = new FormData();
        formData.append("status", newStatus);
        formData.append("_method", "put");

        try {
          const response = await updateData(
            `admin/orders/${id}`,
            formData,
            false
          );

          if (response.status === "success") {
            setLoading(false);
            setStatus(newStatus);
            setTimeout(() => {
              Swal.fire("Updated!", response.message, "success");
            }, 250);
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading || !deliveryOrder) return <p>Loading...</p>;

  return (
    <div className="Show">
      <div className="head">
        <div className="details">
          <h4 className="id">
            <label>order id:</label>
            <b>#{id}</b>
            <span className={pay}>{pay}</span>
            <span className={status}>{status}</span>
          </h4>

          <div className="date">
            <span className="fs-6">
              <MdDateRange />
            </span>
            <label>{deliveryOrder.created_at}</label>
          </div>

          <div className="payment_type">
            <label>payment type:</label>
            <b>{deliveryOrder.PaymentType}</b>
          </div>

          <div className="delivery_time">
            <label>delivery time:</label>
            <b>{deliveryOrder.created_at}</b>
          </div>

          <div className="table_id">
            <label>table id:</label>
            <b>{deliveryOrder.DiningTable_id}</b>
          </div>
        </div>

        <div className="options">
          {userRole && userRole === "admin" || userRole === "casher" ? (
            <select
              name="payment_type"
              id="payment_type"
              value={pay === "Paid" ? "1" : "0"}
              onChange={handlePayChange}
            >
              <option value="1" disabled={pay === "Paid"}>
                Paid
              </option>
              <option value="0" disabled={pay === "Not Paid"}>
                Not Paid
              </option>
            </select>
          ) : (
            false
          )}

          <select
            name="status"
            id="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Not Started" disabled={status === "Not Started"}>
              Not Started
            </option>
            <option value="In Progress" disabled={status === "In Progress"}>
              In Progress
            </option>
            <option value="Cancelled" disabled={status === "Cancelled"}>
              Cancelled
            </option>
            <option value="Accepted" disabled={status === "Accepted"}>
              Accepted
            </option>
          </select>

          <button className="btn btn-primary" onClick={handlePrint}>
            <PrinterOutlined />
            print invoice
          </button>
        </div>
      </div>

      <div className="body d-flex">
        <div className="sections sections-left">
          <div className="title">
            <b>order details</b>
          </div>

          <div className="section">
            <div className="cards">
              <div className="card" data-id="1">
                <div className="card-img">
                  <img src={ImageTest} alt="order" />
                </div>
                <div className="card-text">
                  <p className="name fw-bold">kung peo chicken</p>
                  <p className="quantity">
                    quantity choice: <span className="fw-bold">6 pcs</span>
                  </p>
                  <b className="total">$12.2</b>
                </div>
              </div>

              <div className="card" data-id="2">
                <div className="card-img">
                  <img src={ImageTest} alt="order" />
                </div>
                <div className="card-text">
                  <p className="name fw-bold">kung peo chicken</p>
                  <p className="quantity">
                    quantity choice: <span className="fw-bold">6 pcs</span>
                  </p>
                  <b className="total">$12.2</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sections sections-right">
          <div className="section">
            <div className="title">
              <b>subTotal</b>
              <b>${deliveryOrder.total_cost}</b>
            </div>

            <div className="details">
              <b>total</b>
              <b>${deliveryOrder.total_cost}</b>
            </div>
          </div>

          <div className="section">
            <div className="title">
              <b>subTotal</b>
              <b>${deliveryOrder.total_cost}</b>
            </div>

            <div className="details">
              <b>total</b>
              <b>${deliveryOrder.total_cost}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
