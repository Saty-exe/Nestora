import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addVisitor } from "../../features/visitor/visitorSlice";
import { addNotification } from "../../features/notifications/notificationSlice";

export default function VisitorRequest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user?.loggedInUser ?? null);

  const visitors = useSelector((state) => state.visitor?.visitors ?? []);

  const [visitorName, setVisitorName] = useState("");
  const [relation, setRelation] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [purpose, setPurpose] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVisitor = {
      id: Date.now(),
      tenantId: user?.id,
      tenantName: user?.name,
      visitorName,
      relation,
      phone,
      date,
      time,
      purpose,
      status: "Pending",
    };

    dispatch(addVisitor(newVisitor));
    dispatch(
      addNotification({
        audience: "admin",
        title: "Visitor request pending",
        message: `${user?.name ?? "A resident"} requested entry for ${visitorName}.`,
        type: "visitor",
      }),
    );

    setVisitorName("");
    setRelation("");
    setPhone("");
    setDate("");
    setTime("");
    setPurpose("");
  };

  const userVisitors = visitors.filter(
    (visitor) => visitor.tenantId === user?.id || visitor.tenantName === user?.name,
  );

  return (
    <div className="visitor-page">
      <div className="visitor-header">
        <button
          className="visitor-back"
          onClick={() => navigate("/user/facilities")}
        >
          ←
        </button>

        <div>
          <h1>Visitors</h1>
          <p>Add and manage your visitors</p>
        </div>
      </div>

      <div className="visitor-layout">
        <div className="visitor-form-section">
          <h2>Add a Visitor</h2>
          <p className="section-description">
            Enter the details of the person visiting you.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="visitor-form-grid">
              <div className="visitor-input">
                <label>Visitor Name</label>

                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Enter visitor name"
                  required
                />
              </div>

              <div className="visitor-input">
                <label>Relation</label>

                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="Brother, Friend, Father..."
                  required
                />
              </div>

              <div className="visitor-input">
                <label>Phone Number</label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="visitor-input">
                <label>Visit Date</label>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="visitor-input">
                <label>Visit Time</label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>

              <div className="visitor-input">
                <label>Purpose</label>

                <input
                  type="text"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Personal visit"
                  required
                />
              </div>
            </div>

            <button type="submit" className="add-visitor-btn">
              Add Visitor
            </button>
          </form>
        </div>

        <div className="visitor-list-section">
          <div className="visitor-list-header">
            <h2>My Visitors</h2>
            <span>{userVisitors.length}</span>
          </div>

          {userVisitors.length === 0 ? (
            <div className="no-visitors">
              <h3>No visitors added</h3>
              <p>Visitors you add will appear here.</p>
            </div>
          ) : (
            <div className="visitor-list">
              {userVisitors.map((visitor) => (
                <div className="visitor-card" key={visitor.id}>
                  <div className="visitor-card-top">
                    <div className="visitor-avatar">
                      {visitor.visitorName?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3>{visitor.visitorName}</h3>
                      <p>{visitor.relation}</p>
                    </div>
                    <span
                      className={`status ${visitor.status
                        ?.toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {visitor.status}
                    </span>
                  </div>

                  <div className="visitor-card-details">
                    <div>
                      <span>Phone</span>
                      <strong>{visitor.phone}</strong>
                    </div>

                    <div>
                      <span>Date</span>
                      <strong>{visitor.date}</strong>
                    </div>

                    <div>
                      <span>Time</span>
                      <strong>{visitor.time}</strong>
                    </div>

                    <div>
                      <span>Purpose</span>
                      <strong>{visitor.purpose}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
