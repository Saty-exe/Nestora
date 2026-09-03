import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { payRent } from "../../features/tenant/tenantSlice";
import { updateLoggedInUser } from "../../features/user/userSlice";
import { addNotification } from "../../features/notifications/notificationSlice";
import { getPaymentSnapshot } from "../../features/selectors";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user?.loggedInUser ?? null);
  const tenant = useSelector((state) => state.tenant?.tenant ?? []);

  const currentTenant = tenant.find((item) => item.id === user?.id) ?? user;
  const payment = getPaymentSnapshot(currentTenant?.payment);

  const handlePay = () => {
    if (currentTenant?.id && payment?.paymentWindow) {
      const paymentDate = new Date().toISOString().split("T")[0];
      const updatedPayment = {
        ...currentTenant.payment,
        pendingRent: 0,
        lateFee: 0,
        totalPending: 0,
        paymentStatus: "Paid",
        lastPayment: paymentDate,
        lastPaymentMonth: payment.pendingMonth,
        history: [
          {
            id: `${payment.pendingMonth}-${paymentDate}`,
            month: payment.pendingMonth,
            amount: payment.totalPending,
            paidOn: paymentDate,
            status: "Paid",
            mode: "Mock Payment",
          },
          ...(currentTenant.payment?.history ?? []),
        ],
      };

      dispatch(
        payRent({
          tenantId: currentTenant.id,
          month: payment.pendingMonth,
          amount: payment.totalPending,
        }),
      );
      dispatch(updateLoggedInUser({ payment: updatedPayment }));
      dispatch(
        addNotification({
          audience: "resident",
          userId: currentTenant.id,
          title: "Rent payment completed",
          message: `Mock payment for ${payment.pendingMonth} was marked paid.`,
          type: "payment",
        }),
      );
    }
  };

  const history = payment?.history?.length
    ? payment.history
    : [
        {
          id: "last-payment",
          month: payment?.lastPaymentMonth ?? "Previous Month",
          paidOn: payment?.lastPayment ?? "N/A",
          amount: payment?.monthlyRent ?? 0,
          status: "Paid",
        },
      ];

  return (
    <div className="payment-page">
      <div className="payment-header">
        <div>
          <h1>Payments</h1>
          <p>Manage and view your PG payments</p>
        </div>

        <button
          className="payment-back-btn"
          onClick={() => navigate("/user/facilities")}
        >
          Back
        </button>
      </div>

      {payment && payment.paymentStatus !== "Paid" && (
        <div className="pending-payment">
          <div className="pending-payment-content">
            <span>{payment.displayStatus} Payment</span>
            <h2>₹{payment.totalPending ?? 0}</h2>
            <p>Rent for {payment.pendingMonth ?? "Current Month"}</p>

            {payment.lateFee > 0 && (
              <p className="late-fee">Late Fee: ₹{payment.lateFee}</p>
            )}
          </div>

          <div className="pending-payment-action">
            {payment.paymentWindow ? (
              <>
                <p>Payment window is open until {payment.dueDate}</p>
                <button onClick={handlePay}>
                  Pay ₹{payment.totalPending ?? 0}
                </button>
              </>
            ) : (
              <>
                <p>Payment is overdue after {payment.dueDate}</p>
                <button disabled>Payment Window Closed</button>
              </>
            )}
          </div>
        </div>
      )}

      {payment && payment.paymentStatus === "Paid" && (
        <div className="paid-payment">
          <div>
            <span>Payment Status</span>
            <h2>Paid</h2>
            <p>Your payment for {payment.pendingMonth} has been completed.</p>
          </div>

          <div className="paid-icon">✓</div>
        </div>
      )}

      <div className="payment-summary">
        <div className="payment-card">
          <span>Monthly Rent</span>
          <h2>₹{payment?.monthlyRent ?? 0}</h2>
          <p>Per Month</p>
        </div>

        <div className="payment-card">
          <span>Security Deposit</span>
          <h2>₹{payment?.securityDeposit ?? 0}</h2>
          <p>Refundable Deposit</p>
        </div>

        <div className="payment-card">
          <span>Last Payment</span>
          <h2>{payment?.lastPayment ?? "N/A"}</h2>
          <p>Last payment date</p>
        </div>

        <div className="payment-card">
          <span>Payment Status</span>
          <h2
            className={
              payment?.paymentStatus === "Paid"
                ? "payment-paid"
                : "payment-pending"
            }
          >
            {payment?.displayStatus ?? "Unknown"}
          </h2>
          <p>Current payment status</p>
        </div>
      </div>

      <div className="payment-section">
        <div className="payment-section-header">
          <div>
            <h2>Payment Details</h2>
            <p>Your current PG payment information</p>
          </div>
        </div>

        <div className="payment-details">
          <div className="payment-detail">
            <span>Resident</span>
            <strong>{currentTenant?.name ?? "Resident"}</strong>
          </div>
          <div className="payment-detail">
            <span>Room Number</span>
            <strong>{currentTenant?.roomNumber ?? "N/A"}</strong>
          </div>
          <div className="payment-detail">
            <span>Monthly Rent</span>
            <strong>₹{payment?.monthlyRent ?? 0}</strong>
          </div>
          <div className="payment-detail">
            <span>Security Deposit</span>
            <strong>₹{payment?.securityDeposit ?? 0}</strong>
          </div>
          <div className="payment-detail">
            <span>Pending Month</span>
            <strong>{payment?.pendingMonth ?? "N/A"}</strong>
          </div>
          <div className="payment-detail">
            <span>Due Date</span>
            <strong>{payment?.dueDate ?? "N/A"}</strong>
          </div>
          <div className="payment-detail">
            <span>Pending Rent</span>
            <strong>₹{payment?.pendingRent ?? 0}</strong>
          </div>
          <div className="payment-detail">
            <span>Late Fee</span>
            <strong>₹{payment?.lateFee ?? 0}</strong>
          </div>
          <div className="payment-detail">
            <span>Total Pending</span>
            <strong>₹{payment?.totalPending ?? 0}</strong>
          </div>
          <div className="payment-detail">
            <span>Status</span>
            <strong
              className={
                payment?.paymentStatus === "Paid"
                  ? "payment-paid"
                  : "payment-pending"
              }
            >
              {payment?.displayStatus ?? "Unknown"}
            </strong>
          </div>
        </div>
      </div>

      <div className="payment-history">
        <div className="payment-history-header">
          <div>
            <h2>Payment History</h2>
            <p>Your recent payment activity</p>
          </div>
        </div>

        <div className="payment-history-item">
          {history.map((item) => (
            <div className="payment-history-row" key={item.id}>
              <div>
                <strong>{item.month}</strong>
                <p>Payment made on {item.paidOn}</p>
              </div>

              <div className="history-right">
                <strong>₹{item.amount ?? 0}</strong>
                <span className="history-paid">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
