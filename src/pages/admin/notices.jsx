import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotice, removeNotice } from "../../features/notices/noticesSlice";

export default function Notices() {
  const dispatch = useDispatch();

  const notices = useSelector((state) => state.notice.notice);

  const [noticeData, setNoticeData] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    priority: "Normal",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNoticeData({
      ...noticeData,
      [name]: value,
    });
  };

  const handleAddNotice = () => {
    if (!noticeData.title || !noticeData.description || !noticeData.date) {
      return;
    }

    const newNotice = {
      id: Date.now(),
      ...noticeData,
    };

    dispatch(addNotice(newNotice));

    setNoticeData({
      title: "",
      category: "",
      description: "",
      date: "",
      priority: "Normal",
    });
  };
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    notices.forEach((notice) => {
      const deleteDate = new Date(notice.date);

      deleteDate.setDate(deleteDate.getDate() + 1);
      deleteDate.setHours(0, 0, 0, 0);

      if (today >= deleteDate) {
        dispatch(removeNotice(notice.id));
      }
    });
  }, [notices, dispatch]);
  return (
    <div className="notices-page">
      {/* Header */}

      <div className="notices-header">
        <div>
          <h1>Notices</h1>
          <p>Create and manage resident notices</p>
        </div>

        <span>{notices.length} Notices</span>
      </div>

      {/* Add Notice */}

      <div className="notice-add-section">
        <h2>Add Notice</h2>

        <div className="notice-form-grid">
          <div className="notice-field">
            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter notice title"
              value={noticeData.title}
              onChange={handleChange}
            />
          </div>

          <div className="notice-field">
            <label>Category</label>

            <select
              name="category"
              value={noticeData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>

              <option value="General">General</option>

              <option value="Maintenance">Maintenance</option>

              <option value="Food">Food</option>

              <option value="Event">Event</option>

              <option value="Payment">Payment</option>

              <option value="Emergency">Emergency</option>
            </select>
          </div>

          <div className="notice-field">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={noticeData.date}
              onChange={handleChange}
            />
          </div>

          <div className="notice-field">
            <label>Priority</label>

            <select
              name="priority"
              value={noticeData.priority}
              onChange={handleChange}
            >
              <option value="Normal">Normal</option>

              <option value="Important">Important</option>

              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="notice-field notice-full">
            <label>Description</label>

            <textarea
              name="description"
              rows="4"
              placeholder="Write notice..."
              value={noticeData.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="notice-form-actions">
          <button className="notice-add-btn" onClick={handleAddNotice}>
            + Add Notice
          </button>
        </div>
      </div>

      {/* Notice List */}

      <div className="notice-list">
        {notices.length === 0 ? (
          <div className="notice-empty">
            <h2>No Notices</h2>
            <p>Create your first notice above.</p>
          </div>
        ) : (
          notices.map((notice) => (
            <div className="notice-card" key={notice.id}>
              <div className="notice-card-header">
                <div>
                  <h2>{notice.title}</h2>

                  <span>{notice.category}</span>
                </div>

                <div
                  className={`notice-priority ${notice.priority.toLowerCase()}`}
                >
                  {notice.priority}
                </div>
              </div>

              <p className="notice-description">{notice.description}</p>

              <div className="notice-card-footer">
                <span>Date: {notice.date}</span>

                <button
                  className="notice-delete-btn"
                  onClick={() => dispatch(removeNotice(notice.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
