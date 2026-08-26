import { useDispatch, useSelector } from "react-redux";
import {
  removeComplaint,
  updateComplaint,
} from "../../features/complaints/complaintSlice";
import { useEffect } from "react";

export default function Complaints() {
  const dispatch = useDispatch();

  const complaints = useSelector((state) => state.complaint.complaints);

  useEffect(() => {}, []);

  return (
    <div className="complaints-page">
      {/* Header */}

      <div className="complaints-header">
        <div>
          <h1>Complaints</h1>
          <p>View and manage complaints submitted by residents</p>
        </div>

        <span>{complaints.length} Complaints</span>
      </div>

      {/* Summary */}

      <div className="complaints-summary">
        <div className="complaint-summary-card">
          <span>Total</span>
          <strong>{complaints.length}</strong>
        </div>

        <div className="complaint-summary-card">
          <span>Pending</span>
          <strong>
            {complaints.filter((item) => item.status === "Pending").length}
          </strong>
        </div>

        <div className="complaint-summary-card">
          <span>In Progress</span>
          <strong>
            {complaints.filter((item) => item.status === "In Progress").length}
          </strong>
        </div>

        <div className="complaint-summary-card">
          <span>Resolved</span>
          <strong>
            {complaints.filter((item) => item.status === "Resolved").length}
          </strong>
        </div>
      </div>

      {/* Complaints */}

      <div className="complaint-list">
        {complaints.length === 0 ? (
          <div className="complaint-empty">
            <h2>No Complaints</h2>

            <p>No complaints have been submitted by residents.</p>
          </div>
        ) : (
          complaints.map((complaint) => (
            <div className="complaint-card" key={complaint.id}>
              {/* Header */}

              <div className="complaint-card-header">
                <div>
                  <h2>{complaint.title}</h2>

                  <span>{complaint.tenantName}</span>
                </div>

                <span
                  className={`complaint-status ${complaint.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {complaint.status}
                </span>
              </div>

              {/* Category / Priority */}

              <div className="complaint-tags">
                <span className="complaint-category">{complaint.category}</span>

                <span
                  className={`complaint-priority ${complaint.priority.toLowerCase()}`}
                >
                  {complaint.priority}
                </span>
              </div>

              {/* Description */}

              <p className="complaint-description">{complaint.description}</p>

              {/* Complaint Information */}

              <div className="complaint-info">
                <div>
                  <span>Tenant ID</span>
                  <strong>{complaint.tenantId}</strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>{complaint.date}</strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>{complaint.time}</strong>
                </div>

                <div>
                  <span>Assigned To</span>
                  <strong>{complaint.assignedTo || "Not assigned"}</strong>
                </div>

                <div>
                  <span>Photos</span>
                  <strong>{complaint.photos?.length || 0}</strong>
                </div>
              </div>

              {/* Resolution */}

              {complaint.resolution && (
                <div className="complaint-resolution">
                  <span>Resolution</span>

                  <p>{complaint.resolution}</p>
                </div>
              )}

              {/* Footer */}

              <div className="complaint-card-footer">
                <span>
                  Submitted: {complaint.date} • {complaint.time}
                </span>
                <span>Resolved: {complaint.resolvedAt}</span>
                {complaint.status !== "Resolved" && (
                  <button
                    className="complaint-resolve-btn"
                    onClick={() => {
                      const resolvedAt = new Date();

                      dispatch(
                        updateComplaint({
                          id: complaint.id,
                          status: "Resolved",
                          resolvedAt: resolvedAt.toLocaleDateString("en-IN"),
                        }),
                      );

                      const deleteDate = new Date(resolvedAt);
                      deleteDate.setDate(deleteDate.getDate() + 30);

                      const delay = deleteDate - new Date();

                      setTimeout(() => {
                        dispatch(
                          removeComplaint({
                            id: complaint.id,
                          }),
                        );
                      }, delay);
                    }}
                  >
                    Mark Resolved
                  </button>
                )}

                <button
                  className="complaint-delete-btn"
                  onClick={() =>
                    dispatch(
                      removeComplaint({
                        id: complaint.id,
                      }),
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
