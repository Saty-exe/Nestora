import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebar, setSidebar }) {
  const [residentsOpen, setResidentsOpen] = useState(true);
  const [operationsOpen, setOperationsOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);

  return (
    <aside className={`sidebar ${sidebar ? "open" : ""}`}>
      {/* Header */}

      <div className="sidebar-header">
        <h2>Navigation</h2>

        <button className="sidebar-close" onClick={() => setSidebar(false)}>
          ×
        </button>
      </div>

      <div className="sidebar-links">
        {/* Dashboard */}

        <NavLink to="/dashboard">🏠 Dashboard</NavLink>

        {/* =====================
            RESIDENTS
        ===================== */}

        <button
          className="sidebar-dropdown-btn"
          onClick={() => setResidentsOpen(!residentsOpen)}
        >
          <span>Residents</span>

          <span>{residentsOpen ? "⌃" : "⌄"}</span>
        </button>

        {residentsOpen && (
          <div className="sidebar-dropdown">
            <NavLink to="/tenants">Tenants</NavLink>

            <NavLink to="/rooms">Rooms</NavLink>

            <NavLink to="/booking">Bookings</NavLink>

            <NavLink to="/visitor">Visitors</NavLink>
          </div>
        )}

        {/* =====================
            OPERATIONS
        ===================== */}

        <button
          className="sidebar-dropdown-btn"
          onClick={() => setOperationsOpen(!operationsOpen)}
        >
          <span>Operations</span>

          <span>{operationsOpen ? "⌃" : "⌄"}</span>
        </button>

        {operationsOpen && (
          <div className="sidebar-dropdown">
            <NavLink to="/staff">Staff</NavLink>

            <NavLink to="/staffList">Staff List</NavLink>

            <NavLink to="/meal">Meals</NavLink>

            <NavLink to="/laundry">Laundry</NavLink>

            <NavLink to="/housekeeping">Housekeeping</NavLink>
          </div>
        )}

        {/* =====================
            COMMUNICATION
        ===================== */}

        <button
          className="sidebar-dropdown-btn"
          onClick={() => setCommunicationOpen(!communicationOpen)}
        >
          <span>Communication</span>

          <span>{communicationOpen ? "⌃" : "⌄"}</span>
        </button>

        {communicationOpen && (
          <div className="sidebar-dropdown">
            <NavLink to="/notices">Notices</NavLink>

            <NavLink to="/complaints">Complaints</NavLink>

            <NavLink to="/tickets">Tickets</NavLink>

            <NavLink to="/feedback">Feedback</NavLink>
          </div>
        )}

        {/* =====================
            FINANCE
        ===================== */}

        <button
          className="sidebar-dropdown-btn"
          onClick={() => setCommunicationOpen(!communicationOpen)}
        >
          <span>Finance</span>

          <span>⌄</span>
        </button>

        <div className="sidebar-dropdown">
          <NavLink to="/payments">Payments</NavLink>
        </div>

        {/* =====================
            BOOKING CARD
        ===================== */}

        <NavLink to="/bookingCard">Booking Card</NavLink>
      </div>
    </aside>
  );
}
