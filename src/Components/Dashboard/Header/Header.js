import "./Header.css";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiFillShop } from "react-icons/ai";
import { IoBookmarks } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import Logo from "../../../assets/global/logo.png";
import Profile from "./Profile";

export function Header() {
  const history = useHistory();

  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileMenu = document.getElementById("branch");
      if (profileMenu && !profileMenu.contains(event.target)) {
        profileMenu.classList.remove("show");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleClass = (element) => {
    var parent = document.getElementById(element);
    if (parent) parent.classList.toggle("show");

    if (element === "sidebar") {
      var container = document.getElementById("Container");
      container.classList.toggle("full-width");
    }
  };

  const injectAppTitle = () => {
    document.title = "resta - QrCode Restaurant";
    history.push("/admin/dashboard");
  };

  return (
    <div className="Header">
      <Link to="#" onClick={injectAppTitle}>
        <img src={Logo} className="logo" alt="logo" />
      </Link>

      <div className="navbar">
        <div className="customRow">
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => handleToggleClass("branch")}
            >
              <AiFillShop className="icon-shop" />
              <div className="details">
                <span>Branch</span>
                <b>{"Mirpur-1 (main)"}</b>
              </div>
            </button>
            <ul className="dropdown-menu" id="branch">
              <li>
                <Link to="admin/dashboard">
                  <input
                    type="radio"
                    name="branch"
                    id="branch_id_1"
                    value="1"
                    checked={window.location.pathname !== "/branch_2"}
                  />
                  <label htmlFor="branch_id_1">{"Mirpur-1 (main)"}</label>
                </Link>
              </li>
              <li>
                <Link to="/branch_2">
                  <input
                    type="radio"
                    name="branch"
                    id="branch_id_2"
                    value="2"
                    checked={window.location.pathname === "/branch_2"}
                  />
                  <label htmlFor="branch_id_2">{"Gulshan-1"}</label>
                </Link>
              </li>
            </ul>
          </div>

          <div className="customBtn">
            <Link to="/admin/dashboard/pos" className="pos">
              <IoBookmarks />
            </Link>

            <button
              className="menu"
              onClick={() => handleToggleClass("sidebar")}
            >
              <RiMenu2Line />
            </button>
          </div>
        </div>

        <Profile />
      </div>
    </div>
  );
}
