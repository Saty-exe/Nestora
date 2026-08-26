import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Tenants() {
  const tenantData = useSelector((state) => state.tenant.tenant);

  const [name, setName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [occupation, setOccupation] = useState("");
  const [college, setCollege] = useState("");
  const [company, setCompany] = useState("");

  const filteredTenants = [...tenantData].filter((tenant) => {
    const searchByName = (tenant.name || "")
      .toLowerCase()
      .includes(name.toLowerCase());

    const searchByRoom = (tenant.roomNumber || "")
      .toString()
      .toLowerCase()
      .includes(roomNumber.toLowerCase());

    const searchByCollege = (tenant.college || "")
      .toLowerCase()
      .includes(college.toLowerCase());

    const searchByCompany = (tenant.company || "")
      .toLowerCase()
      .includes(company.toLowerCase());

    const searchByOccupation =
      occupation === "" || occupation === "All"
        ? true
        : tenant.occupation === occupation;

    return (
      searchByName &&
      searchByRoom &&
      searchByCollege &&
      searchByCompany &&
      searchByOccupation
    );
  });

  const hasFilter = name || roomNumber || occupation || college || company;

  const resetFilters = () => {
    setName("");
    setRoomNumber("");
    setOccupation("");
    setCollege("");
    setCompany("");
  };

  return (
    <div className="tenants-page">
      {/* Header */}

      <div className="tenants-header">
        <div>
          <h1>Tenants</h1>
          <p>Manage your current tenants</p>
        </div>
      </div>

      {/* Filters */}

      <div className="tenant-filters">
        {/* Name */}

        <div className="tenant-filter-group">
          <label>Name</label>

          <input
            type="text"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Room */}

        <div className="tenant-filter-group">
          <label>Room Number</label>

          <input
            type="text"
            placeholder="Search room..."
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>

        {/* Occupation */}

        <div className="tenant-filter-group">
          <label>Occupation</label>

          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          >
            <option value="">All Occupations</option>
            <option value="Student">Student</option>
            <option value="Working Professional">Working Professional</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* College */}

        <div className="tenant-filter-group">
          <label>College</label>

          <input
            type="text"
            placeholder="Search college..."
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
        </div>

        {/* Company */}

        <div className="tenant-filter-group">
          <label>Company</label>

          <input
            type="text"
            placeholder="Search company..."
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {/* Reset */}

        <button className="tenant-reset-btn" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* Results */}

      {!hasFilter ? (
        <div className="tenant-empty">
          <h2>Search for a Tenant</h2>
          <p>
            Enter a name, room number, college, company, or select an
            occupation.
          </p>
        </div>
      ) : filteredTenants.length === 0 ? (
        <div className="tenant-empty">
          <h2>No Tenant Found</h2>
          <p>No tenant matches the selected filters.</p>
        </div>
      ) : (
        <div className="tenant-results">
          {filteredTenants.map((tenant) => (
            <div className="tenant-card" key={tenant.id}>
              {/* Tenant Header */}

              <div className="tenant-card-header">
                <div>
                  <h2>{tenant.name}</h2>

                  <p>Tenant ID: {tenant.id}</p>
                </div>

                <span className="tenant-status">Active</span>
              </div>

              {/* Basic Information */}

              <div className="tenant-card-info">
                <div>
                  <span>Phone</span>
                  <strong>{tenant.phone || "Not provided"}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{tenant.email || "Not provided"}</strong>
                </div>

                <div>
                  <span>Occupation</span>
                  <strong>{tenant.occupation || "Not provided"}</strong>
                </div>

                <div>
                  <span>Room</span>
                  <strong>{tenant.roomNumber || "Not assigned"}</strong>
                </div>

                <div>
                  <span>Bed</span>
                  <strong>{tenant.bedNumber || "Not assigned"}</strong>
                </div>

                <div>
                  <span>College</span>
                  <strong>{tenant.college || "Not provided"}</strong>
                </div>

                <div>
                  <span>Company</span>
                  <strong>{tenant.company || "Not provided"}</strong>
                </div>
              </div>

              {/* Details Button */}

              <div className="tenant-card-actions">
                <Link
                  className="tenant-details-btn"
                  to={`/tenantDetails/${tenant.id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
