import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import NotificationDropdown from "../shared/NotificationDropdown";

export default function Navbar({ sidebar, setSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* SIDEBAR BUTTON */}

      <button className="sidebar-btn" onClick={() => setSidebar(!sidebar)}>
        ☰
      </button>

      {/* LOGO */}

      <NavLink className="navbar-logo" to="/dashboard">
        <img src={logo} alt="nestora-logo" className="nestora-logo" />
      </NavLink>

      {/* NAVIGATION */}

      <div className="navbar-links">
        <NavLink to="/dashboard">Dashboard</NavLink>

        <NavLink to="/tenants">Tenants</NavLink>

        <NavLink to="/staff">Staff</NavLink>

        <NavLink to="/complaints">Complaints</NavLink>
      </div>

      {/* RIGHT SIDE */}

      <div className="navbar-right">
        <NotificationDropdown audience="admin" />

        <div className="admin-profile">
          <div className="admin-avatar"></div>

          <div className="admin-info">
            <strong>Admin</strong>
            <span>Administrator</span>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
