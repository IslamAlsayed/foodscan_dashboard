import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import { login } from "../../../axiosConfig/Auth";
import Cookies from "js-cookie";

export default function Login() {
  const history = useHistory();

  useEffect(() => {
    if (Cookies.get("token_resta")) {
      history.push("/admin/dashboard");
    }
  }, []);

  const [email, setEmail] = useState("ebtesam132015@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const data = await login(email, password);

      if (data.status === "success") {
        setEmail("");
        setPassword("");
        history.push(`/admin/dashboard`);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="formUser">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card my-5">
              <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                {error && <p className="alert alert-danger">{error}</p>}
                <div className="mb-3">
                  <label htmlFor="email pb-2">email</label>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password pb-2">password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-color px-5 mb-2 w-100"
                  >
                    Login
                  </button>
                </div>
                <div className="changeRoute form-class-ext-center text-dark">
                  <a href="" className="text-dark fw-bold">
                    <Link to="/auth/resetpassword">forget password ?</Link>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
