import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "../../features/booking/bookingSlice";
import { useNavigate } from "react-router-dom";

export default function AddBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    occupation: "",
    roomNumber: "",
    bedNumber: "",
    joiningDate: "",
    checkoutDate: "",

    monthlyRent: "",
    securityDeposit: "",
    amountPaid: "",

    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData({
      ...bookingData,
      [name]: value,
    });
  };

  const handleBooking = () => {
    console.log("Clicked");
    const newBooking = {
      id: Date.now(),
      ...bookingData,
    };

    console.log(newBooking);
    dispatch(addBooking(newBooking));

    navigate("/bookingCard");

    setBookingData({
      name: "",
      phone: "",
      email: "",
      occupation: "",
      roomNumber: "",
      bedNumber: "",
      joiningDate: "",
      checkoutDate: "",

      monthlyRent: "",
      securityDeposit: "",
      amountPaid: "",

      notes: "",
    });
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Add Booking</h1>
        <p>Create a new room booking</p>
      </div>

      {/* Booker Details */}

      <div className="booking-section">
        <h2>Booker Details</h2>

        <div className="booking-grid">
          <div className="booking-field">
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={bookingData.name}
              onChange={handleChange}
            />
          </div>

          <div className="booking-field">
            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={bookingData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="booking-field">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={bookingData.email}
              onChange={handleChange}
            />
          </div>

          <div className="booking-field">
            <label>Occupation</label>

            <select
              name="occupation"
              value={bookingData.occupation}
              onChange={handleChange}
            >
              <option value="">Select occupation</option>
              <option value="Student">Student</option>
              <option value="Working Professional">Working Professional</option>
            </select>
          </div>
        </div>
      </div>

      {/* Booking Details */}

      <div className="booking-section">
        <h2>Booking Details</h2>
        {/* Room Assignment */}

        <div className="details-section">
          <div className="details-form-grid">
            <div className="details-field">
              <label>Room Number</label>

              <input
                type="text"
                name="roomNumber"
                placeholder="Enter room number"
                value={bookingData.roomNumber}
                onChange={handleChange}
              />
            </div>

            <div className="details-field">
              <label>Bed</label>

              <select
                name="bedNumber"
                value={bookingData.bedNumber}
                onChange={handleChange}
              >
                <option value="">Select bed</option>
                <option value="A">Bed A</option>
                <option value="B">Bed B</option>
                <option value="C">Bed C</option>
              </select>
            </div>
          </div>
        </div>

        <div className="booking-grid">
          <div className="booking-field">
            <label>Joining Date</label>

            <input
              type="date"
              name="joiningDate"
              value={bookingData.joiningDate}
              onChange={handleChange}
            />
          </div>

          <div className="booking-field">
            <label>Expected Checkout</label>

            <input
              type="date"
              name="checkoutDate"
              value={bookingData.checkoutDate}
              onChange={handleChange}
            />
          </div>

          <div className="booking-field">
            <label>Monthly Rent</label>

            <input
              type="number"
              name="monthlyRent"
              placeholder="₹ Monthly rent"
              value={bookingData.monthlyRent}
              onChange={handleChange}
            />
          </div>

          <div className="booking-field">
            <label>Security Deposit</label>

            <input
              type="number"
              name="securityDeposit"
              placeholder="₹ Security deposit"
              value={bookingData.securityDeposit}
              onChange={handleChange}
            />
          </div>

          <div className="booking-field">
            <label>Booking Amount (Minimum 5000)</label>

            <input
              type="number"
              name="amountPaid"
              placeholder="Booking amount"
              value={bookingData.amountPaid}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Notes */}

      <div className="booking-section">
        <h2>Notes</h2>

        <div className="booking-field">
          <textarea
            name="notes"
            rows="3"
            placeholder="Additional notes..."
            value={bookingData.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Action */}

      <div className="booking-actions">
        <button className="booking-submit-btn" onClick={handleBooking}>
          Create Booking
        </button>
      </div>
    </div>
  );
}
