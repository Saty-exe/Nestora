import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Send,
  Ticket,
  UserRound,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { addComplaint } from "../../features/complaints/complaintSlice";
import { addNotification } from "../../features/notifications/notificationSlice";

export default function ComplaintUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.loggedInUser ?? null);
  const allComplaints = useSelector((state) => state.complaint?.complaints ?? []);

  const categories = [
    "Maintenance",
    "Water",
    "Wi-Fi",
    "Laundry",
    "Housekeeping",
    "Cleanliness",
    "Other",
  ];

  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "admin",
      text: "Hello! How can we help you with your complaint?",
      time: "10:30 AM",
    },
  ]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.category || !formData.title || !formData.description) {
      return;
    }

    const userComplaints = allComplaints.filter(
      (complaint) =>
        complaint.tenantId === user?.id || complaint.tenantName === user?.name,
    );

    const newComplaint = {
      id: Date.now(),
      ticketId: `TKT-${userComplaints.length + 1}`,
      tenantId: user?.id,
      tenantName: user?.name ?? "Resident",

      category: formData.category,
      title: formData.title,
      description: formData.description,

      date: new Date().toISOString().split("T")[0],

      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      priority: "Medium",
      status: "Pending",

      assignedTo: "Support Team",
      staffNumber: "+91 98765 43210",

      resolution: "",
      resolvedAt: null,
    };

    dispatch(addComplaint(newComplaint));
    dispatch(
      addNotification({
        audience: "admin",
        title: "New complaint submitted",
        message: `${newComplaint.tenantName} raised ${newComplaint.title}.`,
        type: "complaint",
      }),
    );

    setFormData({
      category: "",
      title: "",
      description: "",
    });

    setShowForm(false);
  };

  const complaints = allComplaints.filter(
    (complaint) =>
      complaint.tenantId === user?.id || complaint.tenantName === user?.name,
  );

  const openChat = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const sendMessage = () => {
    if (!message.trim()) {
      return;
    }

    const newMessage = {
      id: Date.now(),
      sender: "tenant",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };

  return (
    <div className="complaints-page">
      <div className="complaints-header">
        <button className="back-btn" onClick={() => navigate("/user/userHome")}>
          <ArrowLeft size={21} />
        </button>

        <div>
          <h1>Complaints</h1>
          <p>Raise a complaint and get help from our team</p>
        </div>
      </div>

      <div className="complaints-layout">
        <div className="complaints-main">
          <div className="complaint-action-card">
            <div>
              <h2>Need help?</h2>

              <p>Submit a complaint and our support team will assist you.</p>
            </div>

            <button
              className="raise-btn"
              onClick={() => setShowForm(!showForm)}
            >
              <Plus size={18} />
              Raise Complaint
            </button>
          </div>

          {showForm && (
            <div className="complaint-form-card">
              <div className="card-heading">
                <div>
                  <h2>Raise Complaint</h2>
                  <p>Tell us what issue you are facing.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Complaint Category</label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Complaint Title</label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Example: AC not working"
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your problem..."
                    rows="5"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <Ticket size={18} />
                  Submit Complaint
                </button>
              </form>
            </div>
          )}

          <div className="my-complaints">
            <div className="section-title">
              <div>
                <h2>My Complaints</h2>
                <p>Track your submitted complaint</p>
              </div>
              <span>{complaints.length} submitted</span>
            </div>

            {complaints.length === 0 ? (
              <div className="empty-complaints">
                <Ticket size={28} />
                <p>No complaints submitted yet.</p>
                <small>Raise a complaint and we will assist you.</small>
              </div>
            ) : (
              <div className="complaint-list">
                {complaints.slice(0, 1).map((complaint) => (
                  <div className="complaint-card" key={complaint.id}>
                    <div className="complaint-card-top">
                      <div className="ticket-info">
                        <div className="ticket-icon">
                          <Ticket size={18} />
                        </div>
                        <div>
                          <span>{complaint.ticketId}</span>
                          <small>{complaint.category}</small>
                        </div>
                      </div>

                      <div
                        className={`status ${complaint.status.toLowerCase()}`}
                      >
                        {complaint.status}
                      </div>
                    </div>

                    <h3>{complaint.title}</h3>

                    <p className="complaint-description">
                      {complaint.description}
                    </p>

                    <div className="complaint-details">
                      <div>
                        <span>Date</span>
                        <strong>{complaint.date}</strong>
                      </div>

                      <div>
                        <span>Time</span>
                        <strong>{complaint.time}</strong>
                      </div>

                      <div>
                        <span>Priority</span>
                        <strong>{complaint.priority}</strong>
                      </div>
                    </div>

                    <div className="complaint-actions">
                      <button onClick={() => openChat(complaint)}>
                        <MessageCircle size={17} />
                        Chat with Admin
                      </button>

                      <a
                        href={`tel:${complaint.staffNumber || "+919876543210"}`}
                      >
                        <Phone size={17} />
                        Staff Contact
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="staff-contact-card">
          <div className="staff-card-icon">
            <Phone size={22} />
          </div>

          <h2>Staff Contact</h2>

          <p>Need immediate assistance? Contact the assigned support staff.</p>

          <div className="staff-info">
            <div className="staff-avatar">
              <UserRound size={20} />
            </div>

            <div>
              <span>Assigned Staff</span>

              <strong>{complaints[0]?.assignedTo || "Support Team"}</strong>
            </div>
          </div>

          <a
            className="staff-number"
            href={`tel:${complaints[0]?.staffNumber || "+919876543210"}`}
          >
            <Phone size={17} />

            {complaints[0]?.staffNumber || "+91 98765 43210"}
          </a>

          <div className="staff-note">
            <ShieldCheck size={17} />

            <span>Available for resident support</span>
          </div>
        </div>
      </div>

      {selectedComplaint && (
        <div className="chat-overlay">
          <div className="chat-box">
            <div className="chat-header">
              <div>
                <h2>Chat with Admin</h2>

                <p>
                  {selectedComplaint.ticketId || `TKT-${selectedComplaint.id}`}
                </p>
              </div>

              <button onClick={() => setSelectedComplaint(null)}>×</button>
            </div>

            <div className="chat-messages">
              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`message ${
                    item.sender === "tenant"
                      ? "tenant-message"
                      : "admin-message"
                  }`}
                >
                  <div className="message-bubble">{item.text}</div>

                  <span>{item.time}</span>
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
              />

              <button onClick={sendMessage}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
