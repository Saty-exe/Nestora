import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getPaymentSnapshot } from "../../features/selectors";

export default function Payments() {
  const bookings = useSelector((state) => state.booking?.booking ?? []);
  const tenants = useSelector((state) => state.tenant?.tenant ?? []);
  const staff = useSelector((state) => state.staff?.staff ?? []);

  const tenantPayments = useMemo(
    () =>
      tenants.map((tenant) => ({
        ...tenant,
        paymentSnapshot: getPaymentSnapshot(tenant.payment),
      })),
    [tenants],
  );

  const paidTenants = tenantPayments.filter(
    (tenant) => tenant.paymentSnapshot?.paymentStatus === "Paid",
  );
  const pendingTenants = tenantPayments.filter(
    (tenant) => tenant.paymentSnapshot?.displayStatus === "Pending",
  );
  const overdueTenants = tenantPayments.filter(
    (tenant) => tenant.paymentSnapshot?.displayStatus === "Overdue",
  );

  const bookingPayments = bookings.reduce(
    (total, booking) =>
      total + Number(booking.amount || booking.amountPaid || 0),
    0,
  );
  const rentCollected = paidTenants.reduce(
    (total, tenant) => total + Number(tenant.payment?.monthlyRent || 0),
    0,
  );
  const pendingRent = [...pendingTenants, ...overdueTenants].reduce(
    (total, tenant) =>
      total + Number(tenant.paymentSnapshot?.totalPending || 0),
    0,
  );
  const totalSalary = staff.reduce(
    (total, member) => total + Number(member.salary || 0),
    0,
  );
  const totalMoneyIn = bookingPayments + rentCollected;
  const totalMoneyOut = totalSalary;
  const netMoney = totalMoneyIn - totalMoneyOut;

  const paymentHistory = tenantPayments.flatMap((tenant) =>
    (tenant.payment?.history ?? []).map((history) => ({
      ...history,
      tenantName: tenant.name,
    })),
  );

  return (
    <div className="payments-page">
      <div className="payments-header">
        <div>
          <h1>Payments</h1>
          <p>Mock financial overview of the PG</p>
        </div>

        <span>Payment Overview</span>
      </div>

      <div className="payment-summary">
        <div className="payment-summary-card total">
          <span>Total Collected</span>
          <strong>₹{totalMoneyIn.toLocaleString("en-IN")}</strong>
        </div>
        <div className="payment-summary-card">
          <span>Paid Tenants</span>
          <strong>{paidTenants.length}</strong>
        </div>
        <div className="payment-summary-card pending">
          <span>Pending Tenants</span>
          <strong>{pendingTenants.length}</strong>
        </div>
        <div className="payment-summary-card pending">
          <span>Overdue Tenants</span>
          <strong>{overdueTenants.length}</strong>
        </div>
        <div className="payment-summary-card salary">
          <span>Pending Rent</span>
          <strong>₹{pendingRent.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <div className="payment-net-card">
        <div>
          <span>Net Money</span>
          <p>Total mock money received minus current staff salary</p>
        </div>

        <strong>₹{netMoney.toLocaleString("en-IN")}</strong>
      </div>

      <div className="payment-sections">
        <div className="payment-section pending-section">
          <div className="payment-section-header">
            <div>
              <h2>Tenant Payment Status</h2>
              <p>Paid, pending, and overdue rent records</p>
            </div>
            <strong>₹{pendingRent.toLocaleString("en-IN")}</strong>
          </div>

          <div className="payment-list">
            {tenantPayments.map((tenant) => (
              <div className="payment-row" key={tenant.id}>
                <div>
                  <strong>{tenant.name}</strong>
                  <span>
                    Room {tenant.roomNumber} • Due {tenant.paymentSnapshot?.dueDate}
                  </span>
                </div>
                <div className="payment-admin-right">
                  <span
                    className={`status ${tenant.paymentSnapshot?.displayStatus
                      ?.toLowerCase()
                      .replaceAll(" ", "-")}`}
                  >
                    {tenant.paymentSnapshot?.displayStatus}
                  </span>
                  <strong>
                    ₹
                    {Number(
                      tenant.paymentSnapshot?.totalPending ||
                        tenant.payment?.monthlyRent ||
                        0,
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-section-header">
            <div>
              <h2>Payment History</h2>
              <p>Mock payments completed by residents</p>
            </div>
          </div>

          <div className="payment-list">
            {paymentHistory.length === 0 ? (
              <div className="payment-empty">No mock payment history yet</div>
            ) : (
              paymentHistory.map((item) => (
                <div className="payment-row" key={`${item.tenantName}-${item.id}`}>
                  <div>
                    <strong>{item.tenantName}</strong>
                    <span>
                      {item.month} • {item.paidOn} • {item.mode}
                    </span>
                  </div>
                  <strong>₹{Number(item.amount || 0).toLocaleString("en-IN")}</strong>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="payment-section">
          <div className="payment-section-header">
            <div>
              <h2>Money Out</h2>
              <p>Current mock expenses</p>
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
      </div>
    </div>
  );
}
