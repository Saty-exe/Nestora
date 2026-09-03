import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Phone,
  Mail,
  Home,
  CalendarDays,
  CreditCard,
  ShieldCheck,
  LogOut,
  BedDouble,
  WalletCards,
  FileText,
} from "lucide-react";

import { clearLoggedInUser } from "../../features/user/userSlice";

export default function Settings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUserId = useSelector((state) => state.user.loggedInUser);
  const tenantData = useSelector((state) => state.tenant.tenant ?? []);

  const user =
    tenantData.find((tenant) => tenant.id === Number(loggedInUserId)) ||
    (typeof loggedInUserId === "object" ? loggedInUserId : null);

  const handleLogout = () => {
    dispatch(clearLoggedInUser());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <UserRound size={40} />
          <h2>No user logged in</h2>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </div>
    );
  }

  const payment = user.payment || {};

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (char) => char.toUpperCase());
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "Not provided";
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return value;
  };

  const personalFields = ["name", "gender", "dateOfBirth", "dob", "age"];

  const contactFields = [
    "phone",
    "mobile",
    "email",
    "address",
    "city",
    "state",
  ];

  const stayFields = [
    "roomNumber",
    "room",
    "joiningDate",
    "contractStartDate",
    "contractEndDate",
  ];

  const excludedFields = [
    "id",
    "name",
    "gender",
    "dateOfBirth",
    "dob",
    "age",
    "phone",
    "mobile",
    "email",
    "address",
    "city",
    "state",
    "roomNumber",
    "room",
    "joiningDate",
    "contractStartDate",
    "contractEndDate",
    "payment",
    "password",
    "role",
  ];

  const extraFields = Object.entries(user).filter(
    ([key]) => !excludedFields.includes(key),
  );

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button
          className="profile-back-btn"
          onClick={() => navigate("/user/userHome")}
        >
          <ArrowLeft size={21} />
        </button>

        <div>
          <h1>My Profile</h1>
          <p>View your resident information</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="profile-container">
        <section className="profile-hero">
          <div className="profile-avatar">
            <UserRound size={42} />
          </div>

          <div className="profile-hero-info">
            <h2>{user.name || "Resident"}</h2>

            <p>Resident ID: #{user.id}</p>

            <span className="resident-badge">
              <ShieldCheck size={14} />
              Resident
            </span>
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <div className="section-icon">
              <UserRound size={19} />
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>Your basic personal details</p>
            </div>
          </div>

          <div className="profile-grid">
            {personalFields.map((field) => {
              if (user[field] === undefined || user[field] === null) {
                return null;
              }

              return (
                <div className="profile-info-card" key={field}>
                  <span>{formatLabel(field)}</span>

                  <strong>{formatValue(user[field])}</strong>
                </div>
              );
            })}
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <div className="section-icon">
              <Phone size={19} />
            </div>

            <div>
              <h2>Contact Information</h2>
              <p>Your registered contact details</p>
            </div>
          </div>

          <div className="profile-grid">
            {contactFields.map((field) => {
              if (user[field] === undefined || user[field] === null) {
                return null;
              }

              const isPhone = field === "phone" || field === "mobile";

              const isEmail = field === "email";

              return (
                <div className="profile-info-card" key={field}>
                  <span>{formatLabel(field)}</span>

                  {isPhone ? (
                    <a href={`tel:${user[field]}`}>
                      <Phone size={15} />
                      {user[field]}
                    </a>
                  ) : isEmail ? (
                    <a href={`mailto:${user[field]}`}>
                      <Mail size={15} />
                      {user[field]}
                    </a>
                  ) : (
                    <strong>{formatValue(user[field])}</strong>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <div className="section-icon">
              <Home size={19} />
            </div>

            <div>
              <h2>Stay Information</h2>
              <p>Your room and contract details</p>
            </div>
          </div>

          <div className="profile-grid">
            {stayFields.map((field) => {
              if (user[field] === undefined || user[field] === null) {
                return null;
              }

              return (
                <div className="profile-info-card" key={field}>
                  <span>{formatLabel(field)}</span>

                  <strong>{formatValue(user[field])}</strong>
                </div>
              );
            })}
          </div>

          {user.roomNumber && (
            <div className="room-highlight">
              <div className="room-icon">
                <BedDouble size={24} />
              </div>

              <div>
                <span>Your Room</span>
                <strong>Room {user.roomNumber}</strong>
              </div>
            </div>
          )}
        </section>

        <section className="profile-section">
          <div className="profile-section-heading">
            <div className="section-icon">
              <WalletCards size={19} />
            </div>

            <div>
              <h2>Payment Information</h2>
              <p>Your current payment details</p>
            </div>
          </div>

          <div className="payment-grid">
            <div className="payment-card">
              <div className="payment-card-icon">
                <CreditCard size={19} />
              </div>

              <span>Monthly Rent</span>

              <strong>₹{payment.monthlyRent || 0}</strong>
            </div>

            <div className="payment-card">
              <div className="payment-card-icon">
                <ShieldCheck size={19} />
              </div>

              <span>Security Deposit</span>

              <strong>₹{payment.securityDeposit || 0}</strong>
            </div>

            <div className="payment-card">
              <div className="payment-card-icon">
                <CalendarDays size={19} />
              </div>

              <span>Last Payment</span>

              <strong>{payment.lastPayment || "Not available"}</strong>
            </div>

            <div className="payment-card">
              <div className="payment-card-icon">
                <FileText size={19} />
              </div>

              <span>Payment Status</span>

              <strong
                className={payment.paymentStatus === "Paid" ? "paid" : "unpaid"}
              >
                {payment.paymentStatus || "Not available"}
              </strong>
            </div>
          </div>
        </section>

        {extraFields.length > 0 && (
          <section className="profile-section">
            <div className="profile-section-heading">
              <div className="section-icon">
                <FileText size={19} />
              </div>

              <div>
                <h2>Other Information</h2>
                <p>Additional information on your account</p>
              </div>
            </div>

            <div className="profile-grid">
              {extraFields.map(([key, value]) => (
                <div className="profile-info-card" key={key}>
                  <span>{formatLabel(key)}</span>

                  <strong>{formatValue(value)}</strong>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="logout-section">
          <div>
            <h2>Logout from Nestora</h2>

            <p>
              You will need to sign in again to access your resident account.
            </p>
          </div>

          <button className="logout-large-btn" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}
