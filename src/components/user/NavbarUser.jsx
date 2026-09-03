import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NesToraLogo from "../../assets/logo.png";
import NotificationDropdown from "../shared/NotificationDropdown";
export default function NavbarUser() {
  const user = useSelector((state) => state.user?.loggedInUser);

  const navItems = [
    {
      name: "Home",
      path: "/user",
    },
    {
      name: "Food",
      path: "/user/food-info",
    },
    {
      name: "Stay",
      path: "/user/facilities",
    },
    {
      name: "Refer & Earn",
      path: "/user/referralPage",
    },
    {
      name: "Support",
      path: "/user/complaints",
    },
    {
      name: "Tickets",
      path: "/user/tickets",
    },
    {
      name: "Profile",
      path: "/user/settings",
    },
  ];

  return (
    <nav className="user-navbar">
      <div className="user-navbar-logo">
        <div className="user-logo">
          <img
            src={NesToraLogo}
            alt="Nestora logo"
            className="user-logo-image"
          />
        </div>

        <span>Nestora</span>
      </div>

      <div className="user-navbar-links">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "user-nav-link active" : "user-nav-link"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <NotificationDropdown audience="resident" userId={user?.id} />
    </nav>
  );
}
