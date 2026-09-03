import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addLaundryRequest } from "../../features/laundry/laundrySlice";
import { addNotification } from "../../features/notifications/notificationSlice";

export default function LaundryInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.loggedInUser);
  const requests = useSelector((state) => state.laundry?.requests ?? []);

  const [formData, setFormData] = useState({
    clothes: "",
    pickupDate: "",
    instructions: "",
  });

  const myRequests = requests.filter((item) => item.tenantId === user?.id);

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
      clothes: Number(formData.clothes),
      pickupDate: formData.pickupDate,
      instructions: formData.instructions,
    };

    dispatch(addLaundryRequest(request));
    dispatch(
      addNotification({
        audience: "admin",
        title: "New laundry request",
        message: `${request.tenantName} requested pickup for ${request.clothes} clothes.`,
        type: "laundry",
      }),
    );

    setFormData({ clothes: "", pickupDate: "", instructions: "" });
  };

  return (
    <div className="laundry-page">
      <div className="laundry-header">
        <div>
          <h1>Laundry</h1>
          <p>Create requests and track laundry status</p>
        </div>
        <button className="payment-back-btn" onClick={() => navigate("/user/facilities")}>
          Back
        </button>
      </div>

      <div className="laundry-layout">
        <form className="laundry-form" onSubmit={handleSubmit}>
          <h2>New Laundry Request</h2>
          <label>
            Number of clothes
            <input
              type="number"
              name="clothes"
              min="1"
              value={formData.clothes}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Pickup date
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Instructions
            <textarea
              name="instructions"
              rows="4"
              value={formData.instructions}
              onChange={handleChange}
              placeholder="Any washing or pickup notes"
            />
          </label>
          <button type="submit">Request Pickup</button>
        </form>

        <div className="laundry-list">
          {myRequests.length === 0 ? (
            <div className="visitor-empty">
              <h3>No Laundry Requests</h3>
              <p>Your laundry requests will appear here.</p>
            </div>
          ) : (
            myRequests.map((item) => (
              <div className="laundry-card" key={item.id}>
                <div className="laundry-card-top">
                  <div>
                    <h2>{item.clothes} Clothes</h2>
                    <span>Pickup {item.pickupDate}</span>
                  </div>
                  <span className="laundry-status">{item.status}</span>
                </div>
                <p>{item.instructions || "No special instructions."}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
