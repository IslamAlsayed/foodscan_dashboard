import "./Details.css";
import Link from "antd/es/typography/Link";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import Dashboard from "../../../../Pages/Dashboard_Pages/Pages/Dashboard";
import ImageTest from "../../../../assets/global/profile.png";
import ProgressOrder from "./ProgressOrder";

export default function Details() {
  const { id } = useParams();
  const currentStep = 4;

  return (
    <div className="DataTable OrderDetails">
      <div className="Breadcrumb">
        <div className="col-12 p-0 mb-3">
          <ul>
            <li>
              <Link to="/admin/dashboard" element={<Dashboard />}>
                dashboard
              </Link>
            </li>
            <span> / </span>
            <li>customer</li>
            <span> / </span>
            <li>order details</li>
          </ul>
        </div>
      </div>

      <div className="sections">
        <div className="section">
          <div className="timeLine-details">
            <p>
              <label>order id:</label>
              <b>{"#456451"}</b>
            </p>
            <p>{"12:45 pm 02-03-2020"}</p>
            <p>
              <b>order type: </b>
              <span style={{ "--c": "#1772FF", "--bg": "#E8F2FF" }}>
                {"delivery"}
              </span>
            </p>
          </div>
          <div className="timeLine-points">
            <div className="points">
              <ProgressOrder currentStep={currentStep} />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="order-details">
            <b>order details</b>
            <div className="cards">
              <div className="card" data-id="1">
                <div className="card-img">
                  <img src={ImageTest} alt="dish" />
                </div>
                <div className="card-text">
                  <p>{"name item"}</p>
                  <p>
                    quantity: <span>{"2 pce"}</span>
                  </p>
                  <p>{"$44"}</p>
                </div>
              </div>

              <div className="card" data-id="2">
                <div className="card-img">
                  <img src={ImageTest} alt="dish" />
                </div>
                <div className="card-text">
                  <p>{"name item"}</p>
                  <p>
                    quantity: <span>{"2 pce"}</span>
                  </p>
                  <p>{"$44"}</p>
                </div>
              </div>

              <div className="card" data-id="3">
                <div className="card-img">
                  <img src={ImageTest} alt="dish" />
                </div>
                <div className="card-text">
                  <p>{"name item"}</p>
                  <p>
                    quantity: <span>{"2 pce"}</span>
                  </p>
                  <p>{"$44"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section">
          <div className="delivery-address">
            <b>delivery address</b>
            <p>lorem lorem lorem lorem lorem</p>
          </div>
        </div>

        <div className="section">
          <div className="payment-info">
            <p>
              <b>method:</b> {"paypal (4864464354)"}
            </p>
            <p>
              <b>status:</b> <span>{"paid"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
