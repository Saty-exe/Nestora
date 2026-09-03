import { useDispatch, useSelector } from "react-redux";
import { updateVisitorStatus } from "../../features/visitor/visitorSlice";
import { addNotification } from "../../features/notifications/notificationSlice";

export default function Visitors() {
  const dispatch = useDispatch();
  const visitors = useSelector((state) => state.visitor?.visitors ?? []);

  const updateStatus = (visitor, status) => {
    dispatch(updateVisitorStatus({ id: visitor.id, status }));
    dispatch(
      addNotification({
        audience: "resident",
        userId: visitor.tenantId,
        title: "Visitor request updated",
        message: `${visitor.visitorName} is ${status}.`,
        type: "visitor",
      }),
    );
  };

  const pending = visitors.filter((item) => item.status === "Pending");
  const active = visitors.filter((item) => item.status !== "Pending");

  return (
    <div className="visitors-page">
      <div className="visitors-header">
        <div>
          <h1>Visitors</h1>
          <p>Manage visitor requests and approved visitors</p>
        </div>

        <span>{visitors.length} Requests</span>
      </div>

      <section className="visitor-section">
        <div className="visitor-section-header">
          <div>
            <h2>Visitor Requests</h2>
            <p>Requests received from the resident portal</p>
          </div>

          <span>{pending.length} Pending</span>
        </div>

        {pending.length === 0 ? (
          <div className="visitor-empty">
            <h3>No Pending Requests</h3>
            <p>There are no visitor requests waiting for approval.</p>
          </div>
        ) : (
          <div className="visitor-request-list">
            {pending.map((request) => (
              <div className="visitor-request-card" key={request.id}>
                <div className="visitor-card-header">
                  <div>
                    <h3>{request.visitorName}</h3>
                    <p>
                      {request.relation} of {request.tenantName}
                    </p>
                  </div>

                  <span className="visitor-pending">Pending</span>
                </div>

                <div className="visitor-info">
                  <div>
                    <span>Resident</span>
                    <strong>{request.tenantName}</strong>
                  </div>
                  <div>
                    <span>Phone</span>
                    <strong>{request.phone}</strong>
                  </div>
                  <div>
                    <span>Date</span>
                    <strong>{request.date}</strong>
                  </div>
                  <div>
                    <span>Time</span>
                    <strong>{request.time}</strong>
                  </div>
                  <div>
                    <span>Purpose</span>
                    <strong>{request.purpose}</strong>
                  </div>
                </div>

                <div className="visitor-actions">
                  <button
                    className="visitor-reject-btn"
                    onClick={() => updateStatus(request, "Rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="visitor-approve-btn"
                    onClick={() => updateStatus(request, "Approved")}
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="visitor-section">
        <div className="visitor-section-header">
          <div>
            <h2>Visitor Status</h2>
            <p>Approved, rejected, and completed visitor requests</p>
          </div>
        </div>

        {active.length === 0 ? (
          <div className="visitor-empty">
            <h3>No Visitors</h3>
            <p>Reviewed visitors will appear here.</p>
          </div>
        ) : (
          <div className="visitor-approved-list">
            {active.map((visitor) => (
              <div className="visitor-approved-card" key={visitor.id}>
                <div>
                  <h3>{visitor.visitorName}</h3>
                  <p>Visiting {visitor.tenantName}</p>
                </div>

                <div className="visitor-approved-info">
                  <span>{visitor.date}</span>
                  <span>{visitor.time}</span>
                  <span className="visitor-approved">{visitor.status}</span>
                  {visitor.status === "Approved" && (
                    <button onClick={() => updateStatus(visitor, "Completed")}>
                      Complete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
