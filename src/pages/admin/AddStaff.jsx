import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStaff } from "../../features/staff/staffSlice";
import { useNavigate } from "react-router-dom";

export default function AddStaff() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [staffData, setStaffData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",

    role: "",
    department: "",
    shift: "",

    joiningDate: "",
    salary: "",

    status: "Active",

    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStaffData({
      ...staffData,
      [name]: value,
    });
  };

  const handleAddStaff = () => {
    const newStaff = {
      id: Date.now(),
      ...staffData,
    };

    dispatch(addStaff(newStaff));

    navigate("/staffList");
  };

  return (
    <div className="add-staff-page">
      {/* Header */}

      <div className="add-staff-header">
        <h1>Add Staff</h1>
        <p>Add a new staff member to the PG</p>
      </div>

      {/* Personal Details */}

      <div className="add-staff-section">
        <h2>Personal Details</h2>

        <div className="add-staff-grid">
          <div className="add-staff-field">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={staffData.name}
              onChange={handleChange}
            />
          </div>

          <div className="add-staff-field">
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={staffData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="add-staff-field">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={staffData.email}
              onChange={handleChange}
            />
          </div>

          <div className="add-staff-field">
            <label>Emergency Contact</label>

            <input
              type="tel"
              name="emergencyContact"
              placeholder="Emergency contact"
              value={staffData.emergencyContact}
              onChange={handleChange}
            />
          </div>

          <div className="add-staff-field add-staff-full">
            <label>Address</label>

            <textarea
              name="address"
              rows="3"
              placeholder="Enter address"
              value={staffData.address}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Employment Details */}

      <div className="add-staff-section">
        <h2>Employment Details</h2>

        <div className="add-staff-grid">
          <div className="add-staff-field">
            <label>Department</label>

            <select
              name="department"
              value={staffData.department}
              onChange={handleChange}
            >
              <option value="">Select department</option>

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

          <div className="add-staff-field">
            <label>Role</label>

            <select name="role" value={staffData.role} onChange={handleChange}>
              <option value="">Select role</option>

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
              <option value="Transport Coordinator">
                Transport Coordinator
              </option>
              <option value="Resident Captain">Resident Captain</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Warden">Warden</option>
              <option value="Caretaker">Caretaker</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="add-staff-field">
            <label>Shift</label>

            <select
              name="shift"
              value={staffData.shift}
              onChange={handleChange}
            >
              <option value="">Select shift</option>

              <option value="Morning">Morning</option>

              <option value="Day">Day</option>

              <option value="Evening">Evening</option>

              <option value="Night">Night</option>
            </select>
          </div>

          <div className="add-staff-field">
            <label>Joining Date</label>

            <input
              type="date"
              name="joiningDate"
              value={staffData.joiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="add-staff-field">
            <label>Monthly Salary</label>

            <input
              type="number"
              name="salary"
              placeholder="₹ Salary"
              value={staffData.salary}
              onChange={handleChange}
            />
          </div>

          <div className="add-staff-field">
            <label>Status</label>

            <select
              name="status"
              value={staffData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>

              <option value="On Leave">On Leave</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes */}

      <div className="add-staff-section">
        <h2>Notes</h2>

        <div className="add-staff-field">
          <textarea
            name="notes"
            rows="4"
            placeholder="Additional information about the staff member..."
            value={staffData.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Actions */}

      <div className="add-staff-actions">
        <button
          className="add-staff-cancel-btn"
          onClick={() => navigate("/staffList")}
        >
          Cancel
        </button>

        <button className="add-staff-submit-btn" onClick={handleAddStaff}>
          Add Staff
        </button>
      </div>
    </div>
  );
}
