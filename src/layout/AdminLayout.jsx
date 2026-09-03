import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/sidebar";

export default function Layout() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className={sidebar ? "app sidebar-open" : "app"}>
      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

      <div className="main-area">
        <Navbar sidebar={sidebar} setSidebar={setSidebar} />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
