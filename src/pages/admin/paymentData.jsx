import { useSelector } from "react-redux";

export default function Payments() {
  const bookings = useSelector((state) => state.booking.booking);
  const tenants = useSelector((state) => state.tenant.tenant);
  const staff = useSelector((state) => state.staff.staff);

  /* =========================
     BOOKING PAYMENTS
  ========================= */

  const bookingPayments = bookings.reduce(
    (total, booking) => total + Number(booking.amount || 0),
    0,
  );

  /* =========================
     RENT
  ========================= */

  const rentCollected = tenants
    .filter((tenant) => tenant.paymentStatus === "Paid")
    .reduce((total, tenant) => total + Number(tenant.rent || 0), 0);

  const pendingTenants = tenants.filter(
    (tenant) => tenant.paymentStatus === "Pending",
  );

  const pendingRent = pendingTenants.reduce(
    (total, tenant) => total + Number(tenant.rent || 0),
    0,
  );

  /* =========================
     MONEY IN
  ========================= */

  const totalMoneyIn = bookingPayments + rentCollected;

  /* =========================
     MONEY OUT
  ========================= */

  const totalSalary = staff.reduce(
    (total, member) => total + Number(member.salary || 0),
    0,
  );

  const totalMoneyOut = totalSalary;

  /* =========================
     NET MONEY
  ========================= */

  const netMoney = totalMoneyIn - totalMoneyOut;

  return (
    <div className="payments-page">
      {/* HEADER */}

      <div className="payments-header">
        <div>
          <h1>Payments</h1>

          <p>Financial overview of the PG</p>
        </div>

        <span>Payment Overview</span>
      </div>

      {/* =========================
          MAIN SUMMARY
      ========================= */}

      <div className="payment-summary">
        <div className="payment-summary-card total">
          <span>Total Money In</span>

          <strong>₹{totalMoneyIn.toLocaleString("en-IN")}</strong>
        </div>

        <div className="payment-summary-card">
          <span>Rent Collected</span>

          <strong>₹{rentCollected.toLocaleString("en-IN")}</strong>
        </div>

        <div className="payment-summary-card">
          <span>Booking Payments</span>

          <strong>₹{bookingPayments.toLocaleString("en-IN")}</strong>
        </div>

        <div className="payment-summary-card pending">
          <span>Pending Rent</span>

          <strong>₹{pendingRent.toLocaleString("en-IN")}</strong>
        </div>

        <div className="payment-summary-card salary">
          <span>Total Money Out</span>

          <strong>₹{totalMoneyOut.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      {/* =========================
          NET BALANCE
      ========================= */}

      <div className="payment-net-card">
        <div>
          <span>Net Money</span>

          <p>Total money received minus total money spent</p>
        </div>

        <strong>₹{netMoney.toLocaleString("en-IN")}</strong>
      </div>

      {/* =========================
          PAYMENT DETAILS
      ========================= */}

      <div className="payment-sections">
        {/* MONEY IN */}

        <div className="payment-section">
          <div className="payment-section-header">
            <div>
              <h2>Money In</h2>

              <p>Money received by the PG</p>
            </div>

            <strong>₹{totalMoneyIn.toLocaleString("en-IN")}</strong>
          </div>

          <div className="payment-list">
            <div className="payment-row">
              <div>
                <strong>Rent Collected</strong>

                <span>Paid tenant rent</span>
              </div>

              <strong>₹{rentCollected.toLocaleString("en-IN")}</strong>
            </div>

            <div className="payment-row">
              <div>
                <strong>Booking Payments</strong>

                <span>Payments received from bookings</span>
              </div>

              <strong>₹{bookingPayments.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        {/* MONEY OUT */}

        <div className="payment-section">
          <div className="payment-section-header">
            <div>
              <h2>Money Out</h2>

              <p>Current expenses</p>
            </div>

            <strong>₹{totalMoneyOut.toLocaleString("en-IN")}</strong>
          </div>

          <div className="payment-list">
            <div className="payment-row">
              <div>
                <strong>Staff Salaries</strong>

                <span>Total staff salary</span>
              </div>

              <strong>₹{totalSalary.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

        {/* PENDING PAYMENTS */}

        <div className="payment-section pending-section">
          <div className="payment-section-header">
            <div>
              <h2>Pending Rent</h2>

              <p>Tenants who haven't paid</p>
            </div>

            <strong>₹{pendingRent.toLocaleString("en-IN")}</strong>
          </div>

          <div className="payment-list">
            {pendingTenants.length === 0 ? (
              <div className="payment-empty">No pending payments</div>
            ) : (
              pendingTenants.map((tenant) => (
                <div className="payment-row" key={tenant.id}>
                  <div>
                    <strong>{tenant.name}</strong>

                    <span>Pending rent</span>
                  </div>

                  <strong>
                    ₹{Number(tenant.rent || 0).toLocaleString("en-IN")}
                  </strong>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
