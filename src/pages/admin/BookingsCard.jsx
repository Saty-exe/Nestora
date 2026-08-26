import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function BookingCard() {
  const bookingInfo = useSelector((state) => state.booking.booking);

  const [markAsPaid, setMarkAsPaid] = useState([]);

  return (
    <div className="booking-card-container">
      {bookingInfo.length === 0 ? (
        <div className="no-bookings">
          <div className="no-bookings-icon">📋</div>

          <h2>No Pending Bookings</h2>

          <p>New bookings will appear here.</p>
        </div>
      ) : (
        bookingInfo.map((item) => {
          const isPaid = markAsPaid.includes(item.id);

          const amountLeft = isPaid
            ? 0
            : Number(item.monthlyRent || 0) +
              Number(item.securityDeposit || 0) -
              Number(item.amountPaid || 0);

          return (
            <div className="booking-card" key={item.id}>
              {/* Header */}

              <div className="booking-card-header">
                <div>
                  <h2>{item.name}</h2>

                  <p>Booking ID: {item.id}</p>
                </div>

                <span className="booking-status">
                  {isPaid ? "Paid" : item.bookingStatus}
                </span>
              </div>

              {/* Booker Information */}

              <div className="booker-info">
                <div className="booking-info-item">
                  <span>Age</span>

                  <strong>{item.age || "Not provided"}</strong>
                </div>

                <div className="booking-info-item">
                  <span>Gender</span>

                  <strong>{item.gender || "Not provided"}</strong>
                </div>

                <div className="booking-info-item">
                  <span>Phone</span>

                  <strong>{item.phone}</strong>
                </div>

                <div className="booking-info-item">
                  <span>Email</span>

                  <strong>{item.email}</strong>
                </div>

                <div className="booking-info-item">
                  <span>Occupation</span>

                  <strong>{item.occupation}</strong>
                </div>

                {item.college && (
                  <div className="booking-info-item">
                    <span>College</span>

                    <strong>{item.college}</strong>
                  </div>
                )}

                {item.company && (
                  <div className="booking-info-item">
                    <span>Company</span>

                    <strong>{item.company}</strong>
                  </div>
                )}
              </div>

              {/* Room Information */}

              <div className="booking-room-info">
                <h3>Room Details</h3>

                <div className="booking-info-row">
                  <div>
                    <span>Room</span>

                    <strong>{item.roomNumber || "Not assigned"}</strong>
                  </div>

                  <div>
                    <span>Bed</span>

                    <strong>{item.bedNumber || "Not assigned"}</strong>
                  </div>

                  <div>
                    <span>Joining</span>

                    <strong>{item.joiningDate || "Not provided"}</strong>
                  </div>

                  <div>
                    <span>Checkout</span>

                    <strong>{item.checkoutDate || "Not provided"}</strong>
                  </div>
                </div>
              </div>

              {/* Payment */}

              <div className="booking-payment">
                <div className="paymentInfo">
                  <span>Monthly Rent</span>

                  <strong>₹{item.monthlyRent || 0}</strong>
                </div>

                <div className="paymentInfo">
                  <span>Security Deposit</span>

                  <strong>₹{item.securityDeposit || 0}</strong>
                </div>

                <div className="paymentInfo">
                  <span>Paid</span>

                  <strong>₹{item.amountPaid || 0}</strong>
                </div>

                <div className="paymentInfo">
                  <span>Amount Left</span>

                  <strong>₹{amountLeft}</strong>
                </div>
              </div>

              {/* Payment Status */}

              <div className="payment-status">
                <p>
                  Payment Status: <strong>{isPaid ? "Paid" : "Pending"}</strong>
                </p>
              </div>

              {/* Actions */}

              <div className="booking-card-actions">
                {!isPaid && (
                  <button
                    onClick={() => {
                      setMarkAsPaid([...markAsPaid, item.id]);
                    }}
                  >
                    Mark as Paid
                  </button>
                )}

                {isPaid && (
                  <Link
                    to={`/bookingDetails/${item.id}`}
                    className="booking-details-btn"
                  >
                    Add Other Details
                  </Link>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
