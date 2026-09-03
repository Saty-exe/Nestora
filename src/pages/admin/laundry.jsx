import { useDispatch, useSelector } from "react-redux";
import { updateLaundryStatus } from "../../features/laundry/laundrySlice";
import { addNotification } from "../../features/notifications/notificationSlice";

const nextStatus = {
  Requested: "Picked Up",
  "Picked Up": "Processing",
  Processing: "Ready",
  Ready: "Delivered",
};

export default function Laundry() {
  const dispatch = useDispatch();
  const laundry = useSelector((state) => state.laundry?.requests ?? []);

  const updateStatus = (item) => {
    const status = nextStatus[item.status];

    if (!status) {
      return;
    }

    dispatch(updateLaundryStatus({ id: item.id, status }));
    dispatch(
      addNotification({
        audience: "resident",
        userId: item.tenantId,
        title: "Laundry updated",
        message: `Your laundry is now ${status}.`,
        type: "laundry",
      }),
    );
  };

  const count = (status) => laundry.filter((item) => item.status === status).length;

  return (
    <div className="laundry-page">
      <div className="laundry-header">
        <div>
          <h1>Laundry</h1>
          <p>Manage resident laundry requests</p>
        </div>

        <span>{laundry.length} Requests</span>
      </div>

      <div className="laundry-summary">
        {["Requested", "Picked Up", "Processing", "Ready", "Delivered"].map(
          (status) => (
            <div className="laundry-stat" key={status}>
              <span>{status}</span>
              <strong>{count(status)}</strong>
            </div>
          ),
        )}
      </div>

      <div className="laundry-list">
        {laundry.length === 0 ? (
          <div className="visitor-empty">
            <h3>No Laundry Requests</h3>
            <p>Resident laundry requests will appear here.</p>
          </div>
        ) : (
          laundry.map((item) => (
            <div className="laundry-card" key={item.id}>
              <div className="laundry-card-top">
                <div>
                  <h2>{item.tenantName}</h2>
                  <span>Room {item.roomNumber}</span>
                </div>

                <span
                  className={`laundry-status ${item.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="laundry-info">
                <div>
                  <span>Clothes</span>
                  <strong>{item.clothes}</strong>
                </div>
                <div>
                  <span>Pickup</span>
                  <strong>{item.pickupDate}</strong>
                </div>
                <div>
                  <span>Instructions</span>
                  <strong>{item.instructions || "None"}</strong>
                </div>
              </div>

              <div className="laundry-actions">
                {nextStatus[item.status] ? (
                  <button onClick={() => updateStatus(item)}>
                    Mark {nextStatus[item.status]}
                  </button>
                ) : (
                  <span>Delivered</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
