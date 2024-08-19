import "../DataTable.css";
import "./QrCode.css";
import Dashboard from "../Dashboard";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { PrinterOutlined } from "@ant-design/icons";
import Logo from "../../../../assets/global/logo.png";
import QrCode from "../../../../assets/global/qrCode.png";

export default function Show() {
  // const { id } = useParams();

  const handlePrintQrCode = () => {
    window.print();
  };

  return (
    <div className="Show">
      <div className="Breadcrumb">
        <div className="col-12 p-0">
          <ul>
            <li>
              <Link to="/admin/dashboard" element={<Dashboard />}>
                dashboard
              </Link>
            </li>
            <span> / </span>
            <li>dining table</li>
            <span> / </span>
            <li>show</li>
          </ul>
        </div>
      </div>

      <div className="qrCodeComponent">
        <div className="qrCode-head">
          <label>dining table</label>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => handlePrintQrCode()}
          >
            <PrinterOutlined />
            print
          </button>
        </div>

        <div className="qrCode-body">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <p>mirpur 1 (main)</p>
          <p>+48446843546</p>
          <p>house: 25, road no: 2, block a, mirpur-1, dhaka 1216</p>

          <div className="qrCode">
            <img src={QrCode} alt="QrCode" />
          </div>
        </div>
      </div>
    </div>
  );
}
