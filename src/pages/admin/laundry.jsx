import { useState } from "react";

const laundryData = [
  {
    id: 1,
    tenantName: "Rahul Sharma",
    room: "A-101",
    clothes: 8,
    service: "Regular",
    date: "25 Aug 2026",
    status: "Pending",
  },
  {
    id: 2,
    tenantName: "Ankit Verma",
    room: "B-204",
    clothes: 12,
    service: "Express",
    date: "25 Aug 2026",
    status: "Washing",
  },
  {
    id: 3,
    tenantName: "Priya Singh",
    room: "A-105",
    clothes: 6,
    service: "Regular",
    date: "24 Aug 2026",
    status: "Ready",
  },
  {
    id: 4,
    tenantName: "Vivek Kumar",
    room: "C-302",
    clothes: 10,
    service: "Regular",
    date: "24 Aug 2026",
    status: "Completed",
  },
];

export default function Laundry() {
  const [laundry, setLaundry] = useState(laundryData);

  const updateStatus = (id, status) => {
    setLaundry(
      laundry.map((item) =>
        item.id === id ? { ...item, status: status } : item,
      ),
    );
  };

  const pending = laundry.filter((item) => item.status === "Pending").length;

  const washing = laundry.filter((item) => item.status === "Washing").length;

  const ready = laundry.filter((item) => item.status === "Ready").length;

  const completed = laundry.filter(
    (item) => item.status === "Completed",
  ).length;

  return (
    <div className="laundry-page">
      {/* Header */}

      <div className="laundry-header">
        <div>
          <h1>Laundry</h1>

          <p>Manage resident laundry requests</p>
        </div>

        <span>{laundry.length} Requests</span>
      </div>

      {/* Summary */}

      <div className="laundry-summary">
        <div className="laundry-stat">
          <span>Total</span>
          <strong>{laundry.length}</strong>
        </div>

        <div className="laundry-stat pending">
          <span>Pending</span>
          <strong>{pending}</strong>
        </div>

        <div className="laundry-stat washing">
          <span>Washing</span>
          <strong>{washing}</strong>
        </div>

        <div className="laundry-stat ready">
          <span>Ready</span>
          <strong>{ready}</strong>
        </div>

        <div className="laundry-stat completed">
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>
      </div>

      {/* Laundry List */}

      <div className="laundry-list">
        {laundry.map((item) => (
          <div className="laundry-card" key={item.id}>
            <div className="laundry-card-top">
              <div>
                <h2>{item.tenantName}</h2>

                <span>Room {item.room}</span>
              </div>

              <span
                className={`laundry-status ${item.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {item.status}
              </span>
            </div>

            <div className="laundry-info">
              <div>
                <span>Clothes</span>
                <strong>{item.clothes}</strong>
              </div>

              <div>
                <span>Service</span>
                <strong>{item.service}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>{item.date}</strong>
              </div>
            </div>

            {/* Actions */}

            <div className="laundry-actions">
              {item.status === "Pending" && (
                <button onClick={() => updateStatus(item.id, "Washing")}>
                  Start Washing
                </button>
              )}

              {item.status === "Washing" && (
                <button onClick={() => updateStatus(item.id, "Ready")}>
                  Mark Ready
                </button>
              )}

              {item.status === "Ready" && (
                <button onClick={() => updateStatus(item.id, "Completed")}>
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
