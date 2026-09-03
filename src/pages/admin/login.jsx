import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { setLoggedInUser } from "../../features/user/userSlice";

export default function Login() {
  const tenantData = useSelector((state) => state.tenant.tenant);
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch(null);
  const handleLogin = (e) => {
    e.preventDefault();

    setError(false);

    if (role === "admin") {
      navigate("/dashboard");
      return;
    }

    const resident = tenantData.find((item) => item.id === Number(userId));

    if (resident && password === "1234") {
      navigate("/user/userHome");
      console.log("RESIDENT:", resident);
      dispatch(setLoggedInUser(resident));
      console.log("DISPATCHED:", resident);

      navigate("/user/userHome");

      return;
    }

    setError(true);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <img src={logo} alt="Nestora logo" />
        </div>

        {/* Header */}
        <div className="login-header">
          <h1>Welcome to Nestora</h1>
          <p className="login-subtitle">PG Management System</p>
        </div>

        {/* Role Selector */}
        <div className="role-selector">
          <button
            type="button"
            className={`role ${role === "admin" ? "active" : ""}`}
            onClick={() => {
              setRole("admin");
              setError(false);
            }}
          >
            Admin
          </button>

          <button
            type="button"
            className={`role ${role === "resident" ? "active" : ""}`}
            onClick={() => {
              setRole("resident");
              setError(false);
            }}
          >
            Resident
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-input">
            <label>{role === "admin" ? "Admin ID" : "Resident ID"}</label>

            <input
              type="text"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setError(false);
              }}
              placeholder={
                role === "admin" ? "Enter admin ID" : "Enter resident ID"
              }
            />
          </div>

          <div className="login-input">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="login-error">
              Resident ID or password might be invalid
            </p>
          )}

          {/* Login Button */}
          <button type="submit" className="login-btn">
            {role === "admin" ? "Login as Admin" : "Login as Resident"}
          </button>
        </form>

        {/* Footer */}
        <p className="login-footer">Nestora • PG Management System</p>
      </div>
    </div>
  );
}
