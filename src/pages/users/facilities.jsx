import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Facilities() {
  const user = useSelector((state) => state.user.loggedInUser);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("details");
  const [openService, setOpenService] = useState("");

  const toggleService = (service) => {
    setOpenService(openService === service ? "" : service);
  };

  const quickLinks = [
    {
      title: "Payment Details",
      label: "Financial",
      text: "Rent, deposit, and payment status",
      path: "/user/payment",
    },
    {
      title: "Visitors",
      label: "Entry",
      text: "Create and track visitor requests",
      path: "/user/visitorRequest",
    },
    {
      title: "Tickets",
      label: "Support",
      text: "Talk with admin about your requests",
      path: "/user/tickets",
    },
    {
      title: "Housekeeping",
      label: "Cleaning",
      text: "Request room cleaning",
      path: "/user/housekeeping",
    },
  ];

  const services = [
    {
      title: "Food & Meals",
      text: "View today's meals and weekly food schedule",
      path: "/user/food-info",
    },
    {
      title: "Laundry",
      text: "Create pickup requests and check current status",
      path: "/user/laundry-info",
    },
    {
      title: "Refer & Earn",
      text: "Share your referral code and track rewards",
      path: "/user/referralPage",
    },
  ];

  return (
    <div className="facilities-page">
      <div className="facilities-header">
        <div>
          <p className="facilities-label">NESTORA LIVING</p>
          <h1>Facilities</h1>
          <p className="facilities-subtitle">
            Room, services, requests, and resident information.
          </p>
        </div>
      </div>

      <div className="facilities-tabs">
        <button
          className={
            activeSection === "details" ? "facility-tab active" : "facility-tab"
          }
          onClick={() => setActiveSection("details")}
        >
          Details
        </button>
        <button
          className={
            activeSection === "services"
              ? "facility-tab active"
              : "facility-tab"
          }
          onClick={() => setActiveSection("services")}
        >
          Services
        </button>
      </div>

      {activeSection === "details" && (
        <div className="details-section">
          <div className="stay-card">
            <div className="stay-card-header">
              <div className="stay-icon">Stay</div>
              <div>
                <p>YOUR STAY</p>
                <h2>Nestora Living</h2>
              </div>
            </div>

            <div className="stay-details">
              <div className="stay-detail">
                <span>Resident</span>
                <strong>{user?.name ?? "Resident"}</strong>
              </div>
              <div className="stay-detail">
                <span>Room Number</span>
                <strong>{user?.roomNumber ?? "N/A"}</strong>
              </div>
              <div className="stay-detail">
                <span>Contract Started</span>
                <strong>{user?.joiningDate ?? "N/A"}</strong>
              </div>
            </div>
          </div>

          <div className="details-grid">
            {quickLinks.map((item) => (
              <button
                type="button"
                className="detail-card"
                key={item.title}
                onClick={() => navigate(item.path)}
              >
                <div className="detail-card-icon">{item.label}</div>
                <div className="detail-card-content">
                  <span>{item.label.toUpperCase()}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <div className="detail-card-arrow">Open</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {activeSection === "services" && (
        <div className="services-section">
          <div className="services-intro">
            <h2>Available Services</h2>
            <p>Simple mock workflows for Phase 2 practice.</p>
          </div>

          {services.map((service) => (
            <button
              type="button"
              className="service-card service-link"
              key={service.title}
              onClick={() => navigate(service.path)}
            >
              <div className="service-icon">{service.title.split(" ")[0]}</div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
              <span className="service-arrow">Open</span>
            </button>
          ))}

          <div className="service-card">
            <button
              type="button"
              className="service-header"
              onClick={() => toggleService("wifi")}
            >
              <div className="service-left">
                <div className="service-icon">Wi-Fi</div>
                <div className="service-content">
                  <h3>Wi-Fi</h3>
                  <p>Internet access details</p>
                </div>
              </div>
              <span className="service-arrow">
                {openService === "wifi" ? "Hide" : "Show"}
              </span>
            </button>

            {openService === "wifi" && (
              <div className="service-expanded">
                <div className="wifi-detail">
                  <span>USERNAME</span>
                  <strong>Nestora_102</strong>
                </div>
                <div className="wifi-detail">
                  <span>PASSWORD</span>
                  <strong>WiFi@1024</strong>
                </div>
              </div>
            )}
          </div>

          <div className="service-card">
            <button
              type="button"
              className="service-header"
              onClick={() => toggleService("amenities")}
            >
              <div className="service-left">
                <div className="service-icon">More</div>
                <div className="service-content">
                  <h3>Other Amenities</h3>
                  <p>Shared facilities available at Nestora</p>
                </div>
              </div>
              <span className="service-arrow">
                {openService === "amenities" ? "Hide" : "Show"}
              </span>
            </button>

            {openService === "amenities" && (
              <div className="amenities-list">
                <span>Common Area</span>
                <span>DTH</span>
                <span>Microwave</span>
                <span>Parking Space</span>
                <span>Fridge</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
