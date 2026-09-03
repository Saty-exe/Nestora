import { useDispatch, useSelector } from "react-redux";
import { updateHousekeepingStatus } from "../../features/housekeeping/housekeepingSlice";
import { addNotification } from "../../features/notifications/notificationSlice";

const nextStatus = {
  Requested: "In Progress",
  "In Progress": "Completed",
};

export default function AdminHousekeeping() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.housekeeping?.requests ?? []);

  const updateStatus = (request) => {
    const status = nextStatus[request.status];

    if (!status) {
      return;
    }

    dispatch(updateHousekeepingStatus({ id: request.id, status }));
    dispatch(
      addNotification({
        audience: "resident",
        userId: request.tenantId,
        title: "Housekeeping updated",
        message: `Your cleaning request is ${status}.`,
        type: "housekeeping",
      }),
    );
  };

  return (
    <div className="housekeeping-page">
      <div className="laundry-header">
        <div>
          <h1>Housekeeping</h1>
          <p>Manage resident cleaning requests</p>
        </div>
        <span>{requests.length} Requests</span>
      </div>

      <div className="laundry-summary">
        {["Requested", "In Progress", "Completed"].map((status) => (
          <div className="laundry-stat" key={status}>
            <span>{status}</span>
            <strong>{requests.filter((item) => item.status === status).length}</strong>
          </div>
        ))}
      </div>

      <div className="laundry-list">
        {requests.length === 0 ? (
          <div className="visitor-empty">
            <h3>No Housekeeping Requests</h3>
            <p>Resident cleaning requests will appear here.</p>
          </div>
        ) : (
          requests.map((request) => (
            <div className="laundry-card" key={request.id}>
              <div className="laundry-card-top">
                <div>
                  <h2>{request.tenantName}</h2>
                  <span>Room {request.roomNumber}</span>
                </div>
                <span className="laundry-status">{request.status}</span>
              </div>

              <div className="laundry-info">
                <div>
                  <span>Date</span>
                  <strong>{request.preferredDate}</strong>
                </div>
                <div>
                  <span>Time</span>
                  <strong>{request.preferredTime}</strong>
                </div>
                <div>
                  <span>Notes</span>
                  <strong>{request.notes || "None"}</strong>
                </div>
              </div>

              <div className="laundry-actions">
                {nextStatus[request.status] ? (
                  <button onClick={() => updateStatus(request)}>
                    Mark {nextStatus[request.status]}
                  </button>
                ) : (
                  <span>Completed</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
