import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addHousekeepingRequest } from "../../features/housekeeping/housekeepingSlice";
import { addNotification } from "../../features/notifications/notificationSlice";

export default function Housekeeping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.loggedInUser);
  const requests = useSelector((state) => state.housekeeping?.requests ?? []);

  const [formData, setFormData] = useState({
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const myRequests = requests.filter((item) => item.tenantId === user?.id);
  const latestStatus = myRequests[0]?.status ?? "Not Requested";

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const request = {
      tenantId: user?.id,
      tenantName: user?.name ?? "Resident",
      roomNumber: user?.roomNumber ?? "N/A",
      ...formData,
    };

    dispatch(addHousekeepingRequest(request));
    dispatch(
      addNotification({
        audience: "admin",
        title: "Housekeeping requested",
        message: `${request.tenantName} requested room cleaning.`,
        type: "housekeeping",
      }),
    );
    setFormData({ preferredDate: "", preferredTime: "", notes: "" });
  };

  return (
    <div className="housekeeping-page">
      <div className="laundry-header">
        <div>
          <h1>Housekeeping</h1>
          <p>Request cleaning and track the status</p>
        </div>
        <button className="payment-back-btn" onClick={() => navigate("/user/facilities")}>
          Back
        </button>
      </div>

      <div className="home-payment-card">
        <div className="home-payment-info">
          <div className="home-payment-title">
            <span>Current Status</span>
            <span className="home-payment-status">{latestStatus}</span>
          </div>
          <p>Housekeeping requests are mock Phase 2 workflow data.</p>
        </div>
      </div>

      <div className="laundry-layout">
        <form className="laundry-form" onSubmit={handleSubmit}>
          <h2>Request Cleaning</h2>
          <label>
            Preferred date
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Preferred time
            <input
              type="time"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Notes
            <textarea
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Bathroom, floor, desk, or other details"
            />
          </label>
          <button type="submit">Request Cleaning</button>
        </form>

        <div className="laundry-list">
          {myRequests.length === 0 ? (
            <div className="visitor-empty">
              <h3>No Requests</h3>
              <p>Your cleaning requests will appear here.</p>
            </div>
          ) : (
            myRequests.map((item) => (
              <div className="laundry-card" key={item.id}>
                <div className="laundry-card-top">
                  <div>
                    <h2>{item.preferredDate}</h2>
                    <span>{item.preferredTime}</span>
                  </div>
                  <span className="laundry-status">{item.status}</span>
                </div>
                <p>{item.notes || "No extra notes."}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
