import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("admin");
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "admin") {
      navigate("/dashboard");
    } else {
      setShowComingSoon(true);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}

        <div className="login-logo"></div>

        <h1>Welcome to Nestora</h1>

        <p className="login-subtitle">PG Management System</p>

        {/* Role */}

        <div className="role-selector">
          <button
            type="button"
            className={role === "admin" ? "role active" : "role"}
            onClick={() => {
              setRole("admin");
              setShowComingSoon(false);
            }}
          >
            Admin
          </button>

          <button
            type="button"
            className={role === "user" ? "role active" : "role"}
            onClick={() => {
              setRole("user");
              setShowComingSoon(false);
            }}
          >
            User
          </button>
        </div>

        {/* Login Form */}

        <form onSubmit={handleLogin}>
          <div className="login-input">
            <label>{role === "admin" ? "Admin ID" : "User ID"}</label>

            <input
              type="text"
              placeholder={
                role === "admin" ? "Enter admin ID" : "Enter user ID"
              }
            />
          </div>

          <div className="login-input">
            <label>Password</label>

            <input type="password" placeholder="Enter password" />
          </div>

          <button className="login-btn" type="submit">
            {role === "admin" ? "Login as Admin" : "Continue"}
          </button>
        </form>

        {/* Coming Soon */}

        {showComingSoon && (
          <div className="coming-soon">
            <strong>User Portal Coming Soon</strong>

            <p>The resident portal is currently under development.</p>
          </div>
        )}

        <p className="login-footer">Nestora • PG Management System</p>
      </div>
    </div>
  );
}
