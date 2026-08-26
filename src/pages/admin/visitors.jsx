import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVisitor } from "../../features/visitor/visitorSlice";
import { visitorRequestsData } from "../../features/visitor/visitorData";
export default function Visitors() {
  const dispatch = useDispatch();

  const visitors = useSelector((state) => state.visitor.visitors);

  const [requests, setRequests] = useState(visitorRequestsData);

  const approveVisitor = (request) => {
    const visitor = {
      id: Date.now(),

      tenantId: request.tenantId,

      tenantName: request.tenantName,

      visitorName: request.visitorName,

      relation: request.relation,

      phone: request.phone,

      date: request.date,

      time: request.time,

      purpose: request.purpose,

      status: "Approved",
    };

    dispatch(addVisitor(visitor));

    setRequests(requests.filter((item) => item.id !== request.id));
  };

  const rejectVisitor = (id) => {
    setRequests(requests.filter((item) => item.id !== id));
  };

  return (
    <div className="visitors-page">
      {/* Header */}

      <div className="visitors-header">
        <div>
          <h1>Visitors</h1>

          <p>Manage visitor requests and approved visitors</p>
        </div>

        <span>{visitors.length} Approved</span>
      </div>

      {/* Pending Requests */}

      <section className="visitor-section">
        <div className="visitor-section-header">
          <div>
            <h2>Visitor Requests</h2>

            <p>Requests received from the resident portal</p>
          </div>

          <span>{requests.length} Pending</span>
        </div>

        {requests.length === 0 ? (
          <div className="visitor-empty">
            <h3>No Pending Requests</h3>

            <p>There are no visitor requests waiting for approval.</p>
          </div>
        ) : (
          <div className="visitor-request-list">
            {requests.map((request) => (
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
                    onClick={() => rejectVisitor(request.id)}
                  >
                    Reject
                  </button>

                  <button
                    className="visitor-approve-btn"
                    onClick={() => approveVisitor(request)}
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Approved Visitors */}

      <section className="visitor-section">
        <div className="visitor-section-header">
          <div>
            <h2>Approved Visitors</h2>

            <p>Visitors approved by management</p>
          </div>
        </div>

        {visitors.length === 0 ? (
          <div className="visitor-empty">
            <h3>No Visitors</h3>

            <p>Approved visitors will appear here.</p>
          </div>
        ) : (
          <div className="visitor-approved-list">
            {visitors.map((visitor) => (
              <div className="visitor-approved-card" key={visitor.id}>
                <div>
                  <h3>{visitor.visitorName}</h3>

                  <p>Visiting {visitor.tenantName}</p>
                </div>

                <div className="visitor-approved-info">
                  <span>{visitor.date}</span>

                  <span>{visitor.time}</span>

                  <span className="visitor-approved">Approved</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
