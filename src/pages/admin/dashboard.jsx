import { useSelector } from "react-redux";

export default function Dashboard() {
  const tenants = useSelector((state) => state.tenant.tenant);
  const staff = useSelector((state) => state.staff.staff);
  const bookings = useSelector((state) => state.booking.booking);
  const complaints = useSelector((state) => state.complaint.complaints);
  const notices = useSelector((state) => state.notice.notice);

  /* =========================
     TENANTS
  ========================= */

  const totalTenants = tenants.length;

  const activeTenants = tenants.filter(
    (tenant) => tenant.status === "Active",
  ).length;

  const pendingRent = tenants
    .filter((tenant) => tenant.paymentStatus === "Pending")
    .reduce((total, tenant) => total + Number(tenant.rent || 0), 0);

  /* =========================
     STAFF
  ========================= */

  const totalStaff = staff.length;

  const activeStaff = staff.filter(
    (member) => member.status === "Active",
  ).length;

  const staffSalary = staff.reduce(
    (total, member) => total + Number(member.salary || 0),
    0,
  );

  /* =========================
     BOOKINGS
  ========================= */

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending",
  ).length;

  /* =========================
     COMPLAINTS
  ========================= */

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending",
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "Resolved",
  ).length;

  /* =========================
     PAYMENTS
  ========================= */

  const bookingPayments = bookings.reduce(
    (total, booking) => total + Number(booking.amount || 0),
    0,
  );

  const rentCollected = tenants
    .filter((tenant) => tenant.paymentStatus === "Paid")
    .reduce((total, tenant) => total + Number(tenant.rent || 0), 0);

  const totalMoneyIn = bookingPayments + rentCollected;

  const totalMoneyOut = staffSalary;

  const netMoney = totalMoneyIn - totalMoneyOut;

  return (
    <div className="dashboard-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>

          <p>Overview of your PG operations</p>
        </div>

        <span>Live Overview</span>
      </div>

      {/* =========================
          OVERVIEW
      ========================= */}

      <div className="dashboard-overview">
        <div className="dashboard-stat">
          <span>Total Tenants</span>
          <strong>{totalTenants}</strong>
          <small>{activeTenants} Active</small>
        </div>

        <div className="dashboard-stat">
          <span>Total Staff</span>
          <strong>{totalStaff}</strong>
          <small>{activeStaff} Active</small>
        </div>

        <div className="dashboard-stat">
          <span>Bookings</span>
          <strong>{totalBookings}</strong>
          <small>{pendingBookings} Pending</small>
        </div>

        <div className="dashboard-stat">
          <span>Complaints</span>
          <strong>{totalComplaints}</strong>
          <small>{pendingComplaints} Pending</small>
        </div>

        <div className="dashboard-stat">
          <span>Pending Rent</span>
          <strong>₹{pendingRent.toLocaleString("en-IN")}</strong>
          <small>Unpaid rent</small>
        </div>

        <div className="dashboard-stat dashboard-money">
          <span>Net Money</span>
          <strong>₹{netMoney.toLocaleString("en-IN")}</strong>
          <small>Money In − Money Out</small>
        </div>
      </div>

      {/* =========================
          TENANT SECTION
      ========================= */}

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Tenants</h2>

            <p>Current resident overview</p>
          </div>

          <strong>{totalTenants} Total</strong>
        </div>

        <div className="dashboard-section-grid">
          <div className="dashboard-mini-card">
            <span>Total Tenants</span>
            <strong>{totalTenants}</strong>
          </div>

          <div className="dashboard-mini-card">
            <span>Active</span>
            <strong>{activeTenants}</strong>
          </div>

          <div className="dashboard-mini-card pending">
            <span>Pending Rent</span>
            <strong>₹{pendingRent.toLocaleString("en-IN")}</strong>
          </div>
        </div>
      </section>

      {/* =========================
          STAFF SECTION
      ========================= */}

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Staff</h2>

            <p>Staff and salary overview</p>
          </div>

          <strong>{totalStaff} Staff</strong>
        </div>

        <div className="dashboard-section-grid">
          <div className="dashboard-mini-card">
            <span>Total Staff</span>
            <strong>{totalStaff}</strong>
          </div>

          <div className="dashboard-mini-card">
            <span>Active Staff</span>
            <strong>{activeStaff}</strong>
          </div>

          <div className="dashboard-mini-card salary">
            <span>Total Salary</span>
            <strong>₹{staffSalary.toLocaleString("en-IN")}</strong>
          </div>
        </div>
      </section>

      {/* =========================
          COMPLAINT SECTION
      ========================= */}

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Complaints</h2>

            <p>Resident complaint status</p>
          </div>

          <strong>{totalComplaints} Total</strong>
        </div>

        <div className="dashboard-section-grid">
          <div className="dashboard-mini-card">
            <span>Total</span>
            <strong>{totalComplaints}</strong>
          </div>

          <div className="dashboard-mini-card pending">
            <span>Pending</span>
            <strong>{pendingComplaints}</strong>
          </div>

          <div className="dashboard-mini-card resolved">
            <span>Resolved</span>
            <strong>{resolvedComplaints}</strong>
          </div>
        </div>
      </section>

      {/* =========================
          PAYMENT SECTION
      ========================= */}

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Payments</h2>

            <p>Income and expense overview</p>
          </div>

          <strong>₹{netMoney.toLocaleString("en-IN")}</strong>
        </div>

        <div className="dashboard-section-grid">
          <div className="dashboard-mini-card income">
            <span>Money In</span>
            <strong>₹{totalMoneyIn.toLocaleString("en-IN")}</strong>
          </div>

          <div className="dashboard-mini-card salary">
            <span>Money Out</span>
            <strong>₹{totalMoneyOut.toLocaleString("en-IN")}</strong>
          </div>

          <div className="dashboard-mini-card">
            <span>Net Money</span>
            <strong>₹{netMoney.toLocaleString("en-IN")}</strong>
          </div>
        </div>
      </section>

      {/* =========================
          NOTICES
      ========================= */}

      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Notices</h2>

            <p>Current notices for residents</p>
          </div>

          <strong>{notices.length} Notices</strong>
        </div>

        <div className="dashboard-notices">
          {notices.length === 0 ? (
            <div className="dashboard-empty">No active notices</div>
          ) : (
            notices.slice(0, 3).map((notice) => (
              <div className="dashboard-notice" key={notice.id}>
                <strong>{notice.title}</strong>

                <span>{notice.date}</span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
