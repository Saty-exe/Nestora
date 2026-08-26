import { useParams, Link } from "react-router-dom";
import tenantData from "../features/tenant/tenantData";

export default function TenantDetails() {
  const { id } = useParams();

  const tenant = tenantData.find((item) => item.id === Number(id));

  if (!tenant) {
    return (
      <div className="tenant-not-found">
        <h2>Tenant Not Found</h2>
        <p>The tenant you're looking for doesn't exist.</p>

        <Link to="/tenants" className="back-tenants-btn">
          Back to Tenants
        </Link>
      </div>
    );
  }

  return (
    <div className="tenant-details-page">
      {/* Header */}

      <div className="tenant-details-header">
        <div>
          <span className="tenant-details-label">TENANT DETAILS</span>

          <h1>{tenant.name}</h1>

          <p>Tenant ID: {tenant.id}</p>
        </div>

        <span className="tenant-details-status">{tenant.status}</span>
      </div>

      {/* Profile Card */}

      <div className="tenant-profile-card">
        <img
          src={tenant.avatar}
          alt={tenant.name}
          className="tenant-details-avatar"
        />

        <div className="tenant-profile-info">
          <h2>{tenant.name}</h2>

          <p>{tenant.occupation}</p>

          <div className="tenant-profile-tags">
            <span>Room {tenant.roomNumber}</span>

            <span>Bed {tenant.bedNumber}</span>

            <span>{tenant.gender}</span>

            <span>{tenant.age} years</span>
          </div>
        </div>
      </div>

      {/* Personal Information */}

      <div className="tenant-details-section">
        <div className="tenant-section-header">
          <h2>Personal Information</h2>
        </div>

        <div className="tenant-details-grid">
          <div className="tenant-details-item">
            <span>Full Name</span>
            <strong>{tenant.name}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Age</span>
            <strong>{tenant.age}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Gender</span>
            <strong>{tenant.gender}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Phone</span>
            <strong>{tenant.phone}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Email</span>
            <strong>{tenant.email}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Address</span>
            <strong>{tenant.address}</strong>
          </div>
        </div>
      </div>

      {/* Stay Information */}

      <div className="tenant-details-section">
        <div className="tenant-section-header">
          <h2>Stay Information</h2>
        </div>

        <div className="tenant-details-grid">
          <div className="tenant-details-item">
            <span>Room Number</span>
            <strong>{tenant.roomNumber}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Bed Number</span>
            <strong>{tenant.bedNumber}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Joining Date</span>
            <strong>{tenant.joiningDate}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Occupation</span>
            <strong>{tenant.occupation}</strong>
          </div>

          <div className="tenant-details-item">
            <span>College</span>
            <strong>{tenant.college || "N/A"}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Company</span>
            <strong>{tenant.company || "N/A"}</strong>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}

      <div className="tenant-details-section">
        <div className="tenant-section-header">
          <h2>Emergency Contact</h2>
        </div>

        <div className="tenant-details-grid">
          <div className="tenant-details-item">
            <span>Name</span>
            <strong>{tenant.emergencyContact.name}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Relation</span>
            <strong>{tenant.emergencyContact.relation}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Phone</span>
            <strong>{tenant.emergencyContact.phone}</strong>
          </div>
        </div>
      </div>

      {/* Documents */}

      <div className="tenant-details-section">
        <div className="tenant-section-header">
          <h2>Documents</h2>
        </div>

        <div className="tenant-details-grid">
          <div className="tenant-details-item">
            <span>Aadhaar</span>
            <strong>{tenant.documents.aadhaar}</strong>
          </div>

          <div className="tenant-details-item">
            <span>ID Proof</span>
            <strong>{tenant.documents.idProof}</strong>
          </div>
        </div>
      </div>

      {/* Payment Information */}

      <div className="tenant-details-section">
        <div className="tenant-section-header">
          <h2>Payment Information</h2>
        </div>

        <div className="tenant-details-grid">
          <div className="tenant-details-item">
            <span>Monthly Rent</span>
            <strong>₹{tenant.payment.monthlyRent.toLocaleString()}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Security Deposit</span>
            <strong>₹{tenant.payment.securityDeposit.toLocaleString()}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Last Payment</span>
            <strong>{tenant.payment.lastPayment}</strong>
          </div>

          <div className="tenant-details-item">
            <span>Payment Status</span>

            <strong className="payment-paid">
              {tenant.payment.paymentStatus}
            </strong>
          </div>
        </div>
      </div>

      {/* Back Button */}

      <Link to="/tenants" className="back-tenants-btn">
        ← Back to Tenants
      </Link>
    </div>
  );
}
