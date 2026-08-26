import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Staff() {
  const staff = useSelector((state) => state.staff.staff);

  const totalStaff = staff.length;

  const totalSalary = staff.reduce((acc, sum) => acc + sum.salary, 0);

  const averageSalary = totalStaff === 0 ? 0 : totalSalary / totalStaff;

  const securityStaff = staff.filter(
    (staff) => staff.department === "Security",
  );

  const foodStaff = staff.filter((staff) => staff.department === "Food");

  const MaintenanceStaff = staff.filter(
    (staff) => staff.department === "Maintenance",
  );

  const LaundryStaff = staff.filter((staff) => staff.department === "Laundry");

  const HelperStaff = staff.filter((staff) => staff.department === "Helper");

  const FrontDeskStaff = staff.filter((staff) => staff.role === "Receptionist");

  const Wardens = staff.filter(
    (staff) => staff.role === "Warden" || staff.role === "Resident Captain",
  );

  const transport = staff.filter((staff) => staff.department === "Transport");

  const management = staff.filter((staff) => staff.department === "Management");
  const Active = staff.filter((staff) => staff.status === "Active");
  const OnLeave = staff.filter((staff) => staff.status === "OnLeave");

  return (
    <div className="staff-page">
      <div className="staff-header">
        <h1>Staff</h1>
        <p>Manage and monitor PG staff</p>
      </div>

      {/* Main Dashboard */}

      <div className="staff-dash">
        <div className="staff-stat-card">
          <span>Total Staff</span>
          <strong>{totalStaff}</strong>
        </div>
        <div className="staff-stat-card">
          <span>Monthly Salary</span>
          <strong>₹{totalSalary.toLocaleString()}</strong>
        </div>
        <div className="staff-stat-card">
          <span>Average Salary</span>
          <strong>₹{Math.round(averageSalary).toLocaleString()}</strong>
        </div>
        <div className="staff-stat-card">
          <span>Active</span>
          <strong>{Active.length}</strong>
        </div>{" "}
      </div>
      {/* Department Overview */}

      <div className="staff-department-section">
        <div className="staff-section-header">
          <h2>Staff Overview</h2>
          <span>{totalStaff} Employees</span>
        </div>

        <div className="staff-department-grid">
          <div className="staff-department-card">
            <span>Food</span>
            <strong>{foodStaff.length}</strong>
            <small>Staff</small>
          </div>

          <div className="staff-department-card">
            <span>Security</span>
            <strong>{securityStaff.length}</strong>
            <small>Staff</small>
          </div>

          <div className="staff-department-card">
            <span>Maintenance</span>
            <strong>{MaintenanceStaff.length}</strong>
            <small>Staff</small>
          </div>

          <div className="staff-department-card">
            <span>Laundry</span>
            <strong>{LaundryStaff.length}</strong>
            <small>Staff</small>
          </div>

          <div className="staff-department-card">
            <span>Cleaning</span>
            <strong>
              {staff.filter((staff) => staff.department === "Cleaning").length}
            </strong>
            <small>Staff</small>
          </div>

          <div className="staff-department-card">
            <span>Helpers</span>
            <strong>{HelperStaff.length}</strong>
            <small>Staff</small>
          </div>

          <div className="staff-department-card">
            <span>Front Desk</span>
            <strong>{FrontDeskStaff.length}</strong>
            <small>Staff</small>
          </div>

          <div className="staff-department-card">
            <span>Wardens</span>
            <strong>{Wardens.length}</strong>
            <small>Staff</small>
          </div>

          <div className="staff-department-card">
            <span>Transport</span>
            <strong>{transport.length}</strong>
            <small>Staff</small>
          </div>

          <div className="staff-department-card">
            <span>Management</span>
            <strong>{management.length}</strong>
            <small>Staff</small>
          </div>
          <div className="staff-department-card">
            <span>Active</span>
            <strong>{Active.length}</strong>
            <small>Staff</small>
          </div>
          <div className="staff-department-card">
            <span>onLeave</span>
            <strong>{OnLeave.length}</strong>
            <small>Staff</small>
          </div>
        </div>
      </div>
      <Link to="/staffList">StaffList</Link>
    </div>
  );
}
