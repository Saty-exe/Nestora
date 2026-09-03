import { Outlet } from "react-router-dom";
import NavbarUser from "../components/user/NavbarUser";

export default function UserLayout() {
  return (
    <div className="user-layout">
      <NavbarUser />
      <Outlet />
    </div>
  );
}
