import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteBooking,
  updateBooking,
} from "../../features/booking/bookingSlice";
import { addTenant } from "../../features/tenant/tenantSlice";
import { store } from "../../store/store";

export default function BookingDetails() {
  const navigate = useNavigate(null);
  const { id } = useParams();

  const dispatch = useDispatch();

  const bookingInfo = useSelector((state) => state.booking.booking);

  const booking = bookingInfo.find((item) => item.id.toString() === id);
  const tenantData = useSelector((state) => state.tenant.tenant);

  console.log("TENANT REDUX:", tenantData);
  const [proceed, setProceed] = useState(false);
  const [details, setDetails] = useState({
    age: "",
    gender: "",
    college: "",
    company: "",

    roomNumber: "",
    bedNumber: "",

    address: "",
    city: "",
    state: "",
    pincode: "",

    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",

    idType: "",
    idNumber: "",

    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log(details);

    dispatch(
      updateBooking({
        id: booking.id,
        ...details,
      }),
    );
    setProceed(true);
  };

  const handleConfirm = () => {
    const newTenant = {
      ...booking,
      ...details,
    };

    console.log("BOOKING:", booking);
    console.log("DETAILS:", details);
    console.log("NEW TENANT:", newTenant);

    dispatch(addTenant(newTenant));
    dispatch(deleteBooking(booking.id));
    dispatch(addTenant(newTenant));

    console.log("TENANTS AFTER ADD:", store.getState().tenant.tenant);
    navigate("/tenants");
  };
  if (!booking) {
    return (
      <div className="booking-not-found">
        <h2>Booking Not Found</h2>
        <p>This booking does not exist.</p>
      </div>
    );
  }

  return (
    <div className="booking-details-page">
      {/* Header */}
      <div className="booking-details-header">
        <div>
          <h1>{booking.name}</h1>

          <p>Booking ID: {booking.id}</p>
        </div>
      </div>
      {/* Existing Booking Summary */}
      <div className="details-section">
        <h2>Booking Summary</h2>

        <div className="details-grid">
          <div className="details-item">
            <span>Phone</span>
            <strong>{booking.phone}</strong>
          </div>

          <div className="details-item">
            <span>Email</span>
            <strong>{booking.email}</strong>
          </div>

          <div className="details-item">
            <span>Room</span>
            <strong>{booking.roomNumber}</strong>
          </div>

          <div className="details-item">
            <span>Bed</span>
            <strong>{booking.bedNumber}</strong>
          </div>

          <div className="details-item">
            <span>Joining Date</span>
            <strong>{booking.joiningDate}</strong>
          </div>

          <div className="details-item">
            <span>Monthly Rent</span>
            <strong>₹{booking.monthlyRent}</strong>
          </div>
        </div>
      </div>
      {/* Personal Details */}
      <div className="details-section">
        <h2>Add Personal Details</h2>

        <div className="details-form-grid">
          <div className="details-field">
            <label>Age</label>

            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={details.age}
              onChange={handleChange}
            />
          </div>

          <div className="details-field">
            <label>Gender</label>

            <select
              name="gender"
              value={details.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="details-field">
            <label>College / University</label>

            <input
              type="text"
              name="college"
              placeholder="Enter college"
              value={details.college}
              onChange={handleChange}
            />
          </div>

          <div className="details-field">
            <label>Company</label>

            <input
              type="text"
              name="company"
              placeholder="Enter company"
              value={details.company}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      ={/* Address */}
      <div className="details-section">
        <h2>Add Address</h2>

        <div className="details-form-grid">
          <div className="details-field details-full">
            <label>Full Address</label>

            <textarea
              name="address"
              rows="3"
              placeholder="Enter full address"
              value={details.address}
              onChange={handleChange}
            />
          </div>

          <div className="details-field">
            <label>City</label>

            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={details.city}
              onChange={handleChange}
            />
          </div>

          <div className="details-field">
            <label>State</label>

            <input
              type="text"
              name="state"
              placeholder="Enter state"
              value={details.state}
              onChange={handleChange}
            />
          </div>

          <div className="details-field">
            <label>Pincode</label>

            <input
              type="text"
              name="pincode"
              placeholder="Enter pincode"
              value={details.pincode}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="details-section">
        <h2>Add Emergency Contact</h2>

        <div className="details-form-grid">
          <div className="details-field">
            <label>Name</label>

            <input
              type="text"
              name="emergencyName"
              placeholder="Contact name"
              value={details.emergencyName}
              onChange={handleChange}
            />
          </div>

          <div className="details-field">
            <label>Relation</label>

            <input
              type="text"
              name="emergencyRelation"
              placeholder="Father, Mother..."
              value={details.emergencyRelation}
              onChange={handleChange}
            />
          </div>

          <div className="details-field">
            <label>Phone</label>

            <input
              type="tel"
              name="emergencyPhone"
              placeholder="Contact number"
              value={details.emergencyPhone}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {/* Identity */}
      <div className="details-section">
        <h2>Add Identity Details</h2>

        <div className="details-form-grid">
          <div className="details-field">
            <label>ID Type</label>

            <select
              name="idType"
              value={details.idType}
              onChange={handleChange}
            >
              <option value="">Select ID</option>
              <option value="Aadhaar">Aadhaar</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
              <option value="Voter ID">Voter ID</option>
            </select>
          </div>

          <div className="details-field">
            <label>ID Number</label>

            <input
              type="text"
              name="idNumber"
              placeholder="Enter ID number"
              value={details.idNumber}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {/* Notes */}
      <div className="details-section">
        <h2>Additional Notes</h2>

        <div className="details-field">
          <textarea
            name="notes"
            rows="4"
            placeholder="Additional information..."
            value={details.notes}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* Save */}
      <div className="details-actions">
        {proceed ? (
          <div>
            {" "}
            <button className="save-booking-details" onClick={handleConfirm}>
              Confirm Booking
            </button>
          </div>
        ) : (
          <>
            <button className="save-booking-details" onClick={handleSave}>
              Save Details
            </button>
          </>
        )}
      </div>
    </div>
  );
}
