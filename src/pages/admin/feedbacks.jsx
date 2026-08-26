import { useSelector } from "react-redux";

export default function Feedbacks() {
  const feedbacks = useSelector((state) => state.feedback.feedback);

  return (
    <div className="feedback-page">
      {/* Header */}

      <div className="feedback-header">
        <div>
          <h1>Feedback</h1>
          <p>View feedback submitted by residents</p>
        </div>

        <div className="feedback-count">{feedbacks.length} Feedbacks</div>
      </div>

      {/* Summary */}

      <div className="feedback-summary">
        <div className="feedback-summary-card">
          <span>Total Feedback</span>
          <strong>{feedbacks.length}</strong>
        </div>

        <div className="feedback-summary-card">
          <span>Average Rating</span>

          <strong>
            {feedbacks.length > 0
              ? (
                  feedbacks.reduce(
                    (total, item) => total + Number(item.rating),
                    0,
                  ) / feedbacks.length
                ).toFixed(1)
              : "0.0"}
            /5
          </strong>
        </div>

        <div className="feedback-summary-card">
          <span>Reviewed</span>

          <strong>
            {feedbacks.filter((item) => item.status === "Reviewed").length}
          </strong>
        </div>

        <div className="feedback-summary-card">
          <span>Pending</span>

          <strong>
            {feedbacks.filter((item) => item.status === "Pending").length}
          </strong>
        </div>
      </div>

      {/* Feedback List */}

      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <div className="feedback-empty">
            <h2>No Feedback</h2>
            <p>There is no feedback available yet.</p>
          </div>
        ) : (
          feedbacks.map((review) => (
            <div className="feedback-card" key={review.id}>
              {/* Card Header */}

              <div className="feedback-card-header">
                <div>
                  <h2>{review.tenantName}</h2>

                  <span>Tenant ID: {review.tenantId}</span>
                </div>

                <div className="feedback-status">{review.status}</div>
              </div>

              {/* Rating */}

              <div className="feedback-rating">
                <span className="rating-stars">
                  {"★".repeat(Number(review.rating))}
                  {"☆".repeat(5 - Number(review.rating))}
                </span>

                <strong>{review.rating}/5</strong>
              </div>

              {/* Category */}

              <div className="feedback-category">{review.category}</div>

              {/* Feedback */}

              <div className="feedback-message">
                <p>"{review.feedback}"</p>
              </div>

              {/* Footer */}

              <div className="feedback-card-footer">
                <span>Submitted: {review.date}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
