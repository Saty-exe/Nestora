import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addReferral,
  updateReferralStatus,
} from "../../features/referral/referralSlice";
import { addNotification } from "../../features/notifications/notificationSlice";

export default function ReferAndEarn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.loggedInUser);
  const referrals = useSelector((state) => state.referral?.referrals ?? []);

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const referralAmount = 3000;
  const referralCode = useMemo(() => {
    const nameCode = (user?.name ?? "NST").slice(0, 3).toUpperCase();
    return `${nameCode}${user?.id ?? "000"}REF`;
  }, [user]);

  const myReferrals = referrals.filter((item) => item.tenantId === user?.id);
  const successful = myReferrals.filter((item) => item.status === "Completed");
  const totalEarnings = successful.reduce(
    (total, item) => total + Number(item.reward || 0),
    0,
  );

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addReferral({
        tenantId: user?.id,
        ...formData,
        reward: referralAmount,
      }),
    );
    dispatch(
      addNotification({
        audience: "resident",
        userId: user?.id,
        title: "Referral added",
        message: `${formData.name} was added to your mock referral list.`,
        type: "referral",
      }),
    );
    setFormData({ name: "", phone: "", email: "" });
  };

  return (
    <div className="referral-page">
      <div className="referral-header">
        <button
          className="referral-back"
          onClick={() => navigate("/user/facilities")}
        >
          ←
        </button>

        <div>
          <p className="referral-label">NESTORA REWARDS</p>
          <h1>Refer & Earn</h1>
          <p>Refer someone to Nestora and earn mock rewards</p>
        </div>
      </div>

      <div className="referral-hero">
        <div>
          <span>YOUR REFERRAL CODE</span>
          <h2>{referralCode}</h2>
          <p>Earn up to ₹{referralAmount} for every successful referral.</p>
        </div>

        <button className="referral-copy-btn" onClick={copyCode}>
          {copied ? "Copied" : "Copy Code"}
        </button>
      </div>

      <div className="referral-stats">
        <div className="referral-stat">
          <span>Total Referrals</span>
          <strong>{myReferrals.length}</strong>
        </div>
        <div className="referral-stat">
          <span>Successful</span>
          <strong>{successful.length}</strong>
        </div>
        <div className="referral-stat">
          <span>Total Earnings</span>
          <strong>₹{totalEarnings}</strong>
        </div>
      </div>

      <div className="referral-content">
        <div className="referral-form-card">
          <div className="referral-section-heading">
            <h2>Refer Someone</h2>
            <p>Enter the details of the person you want to refer.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="referral-input">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter person's name"
                required
              />
            </div>
            <div className="referral-input">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="referral-input">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />
            </div>
            <button type="submit" className="referral-submit">
              Add Referral
            </button>
          </form>
        </div>

        <div className="referral-list-card">
          <div className="referral-section-heading">
            <h2>My Referrals</h2>
            <p>People you have referred to Nestora.</p>
          </div>

          {myReferrals.length === 0 ? (
            <div className="referral-empty">
              <div className="referral-empty-icon">+</div>
              <h3>No referrals yet</h3>
              <p>Your referred people will appear here.</p>
            </div>
          ) : (
            <div className="referral-list">
              {myReferrals.map((referral) => (
                <div className="referral-person" key={referral.id}>
                  <div className="referral-person-avatar">
                    {referral.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="referral-person-info">
                    <h3>{referral.name}</h3>
                    <p>{referral.phone}</p>
                    <small>{referral.email}</small>
                  </div>
                  <div className="referral-person-reward">
                    <span
                      className={
                        referral.status === "Completed"
                          ? "referral-status completed"
                          : "referral-status"
                      }
                    >
                      {referral.status}
                    </span>
                    <strong>₹{referral.reward}</strong>
                    {referral.status !== "Completed" && (
                      <button
                        type="button"
                        className="referral-mini-btn"
                        onClick={() =>
                          dispatch(
                            updateReferralStatus({
                              id: referral.id,
                              status: "Completed",
                            }),
                          )
                        }
                      >
                        Mock Success
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="referral-note">
        <strong>Mock Phase 2</strong>
        <p>Rewards are frontend-only practice data and are not paid out.</p>
      </div>
    </div>
  );
}
