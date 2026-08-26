import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function StaffList() {
  const staff = useSelector((state) => state.staff.staff);

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [shift, setShift] = useState("");
  const [status, setStatus] = useState("");

  const [showDetails, setShowDetails] = useState(null);

  const filteredStaff = staff.filter((member) => {
    const searchByName = member.name.toLowerCase().includes(name.toLowerCase());

    const searchByDepartment =
      department === "" || member.department === department;

    const searchByRole = role === "" || member.role === role;

    const searchByShift = shift === "" || member.shift === shift;

    const searchByStatus = status === "" || member.status === status;

    return (
      searchByName &&
      searchByDepartment &&
      searchByRole &&
      searchByShift &&
      searchByStatus
    );
  });

  const resetFilters = () => {
    setName("");
    setDepartment("");
    setRole("");
    setShift("");
    setStatus("");
    setShowDetails(null);
  };

  const hasFilter =
    name !== "" ||
    department !== "" ||
    role !== "" ||
    shift !== "" ||
    status !== "";

  return (
    <div className="staff-list-page">
      {/* Header */}

      <div className="staff-list-header">
        <div>
          <h1>Staff Directory</h1>
          <p>Search and manage staff members</p>
        </div>

        <div className="staff-header-actions">
          <span>
            {hasFilter
              ? `${filteredStaff.length} Results`
              : `${staff.length} Staff`}
          </span>

          <Link to="/addStaff" className="add-staff-btn">
            + Add Staff
          </Link>
        </div>
      </div>

      {/* Filters */}

      <div className="staff-filters">
        <div className="staff-filter-group">
          <label>Search Name</label>

          <input
            type="text"
            placeholder="Search staff..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="staff-filter-group">
          <label>Department</label>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Food">Food</option>
            <option value="Laundry">Laundry</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Helper">Helper</option>
            <option value="Security">Security</option>
            <option value="Transport">Transport</option>
            <option value="Resident Services">Resident Services</option>
            <option value="Front Desk">Front Desk</option>
            <option value="Management">Management</option>
          </select>
        </div>

        <div className="staff-filter-group">
          <label>Role</label>

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">All Roles</option>
            <option value="Cook">Cook</option>
            <option value="Kitchen Helper">Kitchen Helper</option>
            <option value="Laundry Staff">Laundry Staff</option>
            <option value="Laundry Helper">Laundry Helper</option>
            <option value="Cleaning Staff">Cleaning Staff</option>
            <option value="Plumber">Plumber</option>
            <option value="Electrician">Electrician</option>
            <option value="Maintenance Helper">Maintenance Helper</option>
            <option value="General Helper">General Helper</option>
            <option value="Security Guard">Security Guard</option>
            <option value="Security Supervisor">Security Supervisor</option>
            <option value="Driver">Driver</option>
            <option value="Transport Coordinator">Transport Coordinator</option>
            <option value="Resident Captain">Resident Captain</option>
            <option value="Receptionist">Receptionist</option>
            <option value="Warden">Warden</option>
            <option value="Caretaker">Caretaker</option>
            <option value="Manager">Manager</option>
          </select>
        </div>

        <div className="staff-filter-group">
          <label>Shift</label>

          <select value={shift} onChange={(e) => setShift(e.target.value)}>
            <option value="">All Shifts</option>
            <option value="Morning">Morning</option>
            <option value="Day">Day</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <div className="staff-filter-group">
          <label>Status</label>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        <button className="staff-reset-btn" onClick={resetFilters}>
          Reset
        </button>
      </div>

      {/* Results */}

      {!hasFilter ? (
        <div className="staff-list-empty">
          <h2>Search Staff</h2>
          <p>Enter a name or select a filter to find staff members.</p>
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="staff-list-empty">
          <h2>No Staff Found</h2>
          <p>No staff member matches your selected filters.</p>
        </div>
      ) : (
        <div className="staff-list-results">
          {filteredStaff.map((member) => (
            <div className="staff-list-card" key={member.id}>
              {/* Header */}

              <div className="staff-list-card-header">
                <div>
                  <h2>{member.name}</h2>
                  <p>{member.role}</p>
                </div>

                <span className="staff-list-status">{member.status}</span>
              </div>

              {/* Basic Information */}

              <div className="staff-list-info">
                <div>
                  <span>Department</span>
                  <strong>{member.department}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{member.phone}</strong>
                </div>

                <div>
                  <span>Shift</span>
                  <strong>{member.shift}</strong>
                </div>

                <div>
                  <span>Salary</span>
                  <strong>₹{Number(member.salary).toLocaleString()}</strong>
                </div>

                <div>
                  <span>Joining Date</span>
                  <strong>{member.joiningDate}</strong>
                </div>
              </div>

              {/* View Details */}

              <div className="staff-card-actions">
                <button
                  type="button"
                  className="view-staff-btn"
                  onClick={() =>
                    setShowDetails(showDetails === member.id ? null : member.id)
                  }
                >
                  {showDetails === member.id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Full Details */}

              {showDetails === member.id && (
                <div className="staff-expanded-details">
                  <div>
                    <span>Email</span>
                    <strong>{member.email || "Not provided"}</strong>
                  </div>

                  <div>
                    <span>Address</span>
                    <strong>{member.address || "Not provided"}</strong>
                  </div>

                  <div>
                    <span>Emergency Contact</span>
                    <strong>{member.emergencyContact || "Not provided"}</strong>
                  </div>

                  <div>
                    <span>Role</span>
                    <strong>{member.role}</strong>
                  </div>

                  <div>
                    <span>Department</span>
                    <strong>{member.department}</strong>
                  </div>

                  <div>
                    <span>Shift</span>
                    <strong>{member.shift}</strong>
                  </div>

                  <div>
                    <span>Joining Date</span>
                    <strong>{member.joiningDate}</strong>
                  </div>

                  <div>
                    <span>Salary</span>
                    <strong>₹{Number(member.salary).toLocaleString()}</strong>
                  </div>

                  <div>
                    <span>Status</span>
                    <strong>{member.status}</strong>
                  </div>

                  <div className="staff-notes">
                    <span>Notes</span>

                    <p>{member.notes || "No notes available."}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
