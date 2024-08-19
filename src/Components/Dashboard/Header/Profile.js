import { Link, useHistory, useLocation } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { AiFillEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import profile from "../../../assets/global/profile.png";
import { useEffect, useState } from "react";
import { logout, getUser } from "../../../axiosConfig/Auth";

const mockAdmin = {
  id: 1,
  name: "Admin",
  email: "admin@example.com",
  phone: "+000000000",
};

export default function Profile() {
  const history = useHistory();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    try {
      const _admin = getUser();
      if (_admin) {
        setAdmin(_admin);
      } else {
        setAdmin(mockAdmin);
      }
    } catch (error) {
      console.error("Failed to get user data", error);
      setAdmin(mockAdmin);
    }
  }, []);

  useEffect(() => {
    const path = location.pathname.replace("/admin/dashboard/", "");
    setActiveItem(path);
  }, [location]);

  const classActive = (part) => {
    return activeItem === part ? "active" : "";
  };

  const authLogout = () => {
    if (document.getElementById("Loader")) {
      document.getElementById("Loader").classList.add("show");
    }

    setTimeout(() => {
      logout();
      document.body.style.overflow = "visible";
      if (document.getElementById("Loader")) {
        document.getElementById("Loader").classList.remove("show");
      }
      history.push("/auth/login");
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileMenu = document.getElementById("profile");
      if (profileMenu && !profileMenu.contains(event.target)) {
        profileMenu.classList.remove("show");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleProfile = (element) => {
    var parent = document.getElementById(element);
    if (parent) parent.classList.toggle("show");

    if (element === "sidebar") {
      var container = document.getElementById("Container");
      if (container) container.classList.toggle("full-width");
    }
  };

  const closeProfileModal = () => {
    let profile = document.getElementById("profile");
    if (profile) profile.classList.remove("show");
  };

  return (
    <div className="dropdown profile">
      <button
        className="dropdown-toggle"
        onClick={() => handleToggleProfile("profile")}
      >
        <img src={profile} alt="avatar" />
        <div className="details">
          <span>Hello</span>
          <b>{admin.name}</b>
        </div>
      </button>
      <ul className="dropdown-menu" id="profile">
        <div className="user">
          <div className="image">
            <img src={profile} alt="user image" />

            <form className="input-file">
              <input
                type="file"
                name="image"
                id="file-input"
                className="file-input"
              />
              <label htmlFor="file-input">
                <AiFillEdit />
              </label>
            </form>
          </div>

          <ul>
            <li key="0">{admin.name}</li>
            <li key="1" className="email">
              {admin.email}
            </li>
            <li key="2">{admin.phone}</li>
          </ul>
        </div>

        <ul className="group">
          <li
            className={`item ${classActive("edit/profile")}`}
            onClick={() => closeProfileModal()}
          >
            <Link to="/admin/dashboard/edit/profile">
              <FiEdit />
              <span>edit profile</span>
            </Link>
          </li>
          <li
            className={`item ${classActive("change/email")}`}
            onClick={() => closeProfileModal()}
          >
            <Link to="/admin/dashboard/change/email">
              <MdEmail />
              <span>change email</span>
            </Link>
          </li>
          <li
            className={`item ${classActive("change/password")}`}
            onClick={() => closeProfileModal()}
          >
            <Link to="/admin/dashboard/change/password">
              <IoKeyOutline />
              <span>change password</span>
            </Link>
          </li>
          <li className="item" onClick={authLogout}>
            <Link to="#">
              <CiLogout />
              <span>logout</span>
            </Link>
          </li>
        </ul>
      </ul>
    </div>
  );
}
