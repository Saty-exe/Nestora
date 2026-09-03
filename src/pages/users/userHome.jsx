import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { timeToSeconds, currentTimeInSeconds } from "../../utils/time";
import {
  getPaymentSnapshot,
  selectNotificationsFor,
} from "../../features/selectors";

export default function UserHome() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user?.loggedInUser ?? null);
  const tenants = useSelector((state) => state.tenant?.tenant ?? []);
  const mealData = useSelector((state) => state.meal?.meal ?? []);
  const complaints = useSelector((state) => state.complaint?.complaints ?? []);
  const visitors = useSelector((state) => state.visitor?.visitors ?? []);
  const laundry = useSelector((state) => state.laundry?.requests ?? []);
  const housekeeping = useSelector((state) => state.housekeeping?.requests ?? []);
  const tickets = useSelector((state) => state.ticket?.tickets ?? []);
  const notifications = useSelector((state) =>
    selectNotificationsFor(state, "resident", user?.id),
  );

  const resident = tenants.find((item) => item.id === user?.id) ?? user;
  const payment = getPaymentSnapshot(resident?.payment);

  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayMeal = mealData.find((item) => item.day === currentDay);
  const meals = todayMeal?.meals ?? [];
  const currentTime = currentTimeInSeconds();

  const currentMeal = meals
    .map((meal) => ({
      ...meal,
      timeInSeconds: timeToSeconds(meal.time),
    }))
    .filter((meal) => currentTime >= meal.timeInSeconds)
    .at(-1);

  const residentComplaints = complaints.filter(
    (item) => item.tenantId === resident?.id || item.tenantName === resident?.name,
  );
  const residentVisitors = visitors.filter(
    (item) => item.tenantId === resident?.id || item.tenantName === resident?.name,
  );
  const residentLaundry = laundry.filter((item) => item.tenantId === resident?.id);
  const residentHousekeeping = housekeeping.filter(
    (item) => item.tenantId === resident?.id,
  );
  const residentTickets = tickets.filter((item) => item.tenantId === resident?.id);

  const newest = (items) =>
    [...items].sort((a, b) => Number(b.id || 0) - Number(a.id || 0))[0];

  const latestComplaint = newest(residentComplaints);
  const latestVisitor = newest(residentVisitors);
  const latestLaundry = newest(residentLaundry);
  const latestHousekeeping = newest(residentHousekeeping);
  const latestTicket = newest(residentTickets);

  const recentActivity = useMemo(() => {
    return [
      latestComplaint && {
        id: `complaint-${latestComplaint.id}`,
        label: "Complaint",
        text: `${latestComplaint.title} is ${latestComplaint.status}`,
      },
      latestVisitor && {
        id: `visitor-${latestVisitor.id}`,
        label: "Visitor",
        text: `${latestVisitor.visitorName} is ${latestVisitor.status}`,
      },
      latestLaundry && {
        id: `laundry-${latestLaundry.id}`,
        label: "Laundry",
        text: `${latestLaundry.clothes} clothes are ${latestLaundry.status}`,
      },
      latestHousekeeping && {
        id: `housekeeping-${latestHousekeeping.id}`,
        label: "Housekeeping",
        text: `Cleaning request is ${latestHousekeeping.status}`,
      },
      latestTicket && {
        id: `ticket-${latestTicket.id}`,
        label: "Ticket",
        text: `${latestTicket.subject} is ${latestTicket.status}`,
      },
    ].filter(Boolean);
  }, [
    latestComplaint,
    latestVisitor,
    latestLaundry,
    latestHousekeeping,
    latestTicket,
  ]);

  const stats = [
    {
      label: "Room",
      value: resident?.roomNumber ? `Room ${resident.roomNumber}` : "N/A",
      action: () => navigate("/user/facilities"),
    },
    {
      label: "Payment",
      value: payment?.displayStatus ?? "Unknown",
      action: () => navigate("/user/payment"),
    },
    {
      label: "Laundry",
      value: latestLaundry?.status ?? "Not Requested",
      action: () => navigate("/user/laundry-info"),
    },
    {
      label: "Visitor",
      value: latestVisitor?.status ?? "No Request",
      action: () => navigate("/user/visitorRequest"),
    },
    {
      label: "Complaint",
      value: latestComplaint?.status ?? "No Complaint",
      action: () => navigate("/user/complaints"),
    },
    {
      label: "Housekeeping",
      value: latestHousekeeping?.status ?? "Not Requested",
      action: () => navigate("/user/housekeeping"),
    },
    {
      label: "Tickets",
      value: latestTicket?.status ?? "No Ticket",
      action: () => navigate("/user/tickets"),
    },
  ];

  return (
    <div className="user-home resident-dashboard">
      <div className="welcome-text">
        <p>Welcome {resident?.name ?? "Resident"}</p>
        <small>{currentDay}</small>
      </div>

      <div className="dashboard-grid">
        {stats.map((item) => (
          <button
            type="button"
            className="dashboard-stat-card"
            key={item.label}
            onClick={item.action}
          >
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </button>
        ))}
      </div>

      {payment && payment.paymentStatus !== "Paid" && (
        <div className="home-payment-card">
          <div className="home-payment-info">
            <div className="home-payment-title">
              <span>Payment Due</span>
              <span className="home-payment-status">{payment.displayStatus}</span>
            </div>
            <h2>₹{payment.totalPending}</h2>
            <p>Rent for {payment.pendingMonth}</p>
            {payment.lateFee > 0 && <small>Late fee: ₹{payment.lateFee}</small>}
          </div>

          <div className="home-payment-action">
            <p>Due by {payment.dueDate}</p>
            <button onClick={() => navigate("/user/payment")}>Pay Now</button>
          </div>
        </div>
      )}

      {payment && payment.paymentStatus === "Paid" && (
        <div className="home-payment-card paid-dashboard-card">
          <div className="home-payment-info">
            <div className="home-payment-title">
              <span>Payment Status</span>
              <span className="home-payment-status">Paid</span>
            </div>
            <h2>Paid</h2>
            <p>Last payment on {payment.lastPayment ?? "N/A"}</p>
          </div>

          <div className="home-payment-action">
            <button onClick={() => navigate("/user/payment")}>
              View Payment
            </button>
          </div>
        </div>
      )}

      <div className="dashboard-two-column">
        <section className="dashboard-panel today-meal">
          <div className="meal-header">
            <div>
              <h2>Today's Meals</h2>
              <span>{currentDay}</span>
            </div>
          </div>

          {currentMeal && (
            <div className="current-meal">
              <small>Currently Serving</small>
              <h3>{currentMeal.type}</h3>
              <p>{currentMeal.time}</p>
              <div className="food-items">
                {currentMeal.items?.map((item) => (
                  <span key={item} className="food-item">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {meals.map((meal) => (
            <div className="meal-item" key={meal.type}>
              <div>
                <small>{meal.type}</small>
                <h3>{meal.time}</h3>
                <div className="food-items">
                  {meal.items?.map((item) => (
                    <span key={item} className="food-item">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {!todayMeal && <p>No meal schedule available for today.</p>}
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel-heading">
            <h2>Notifications</h2>
            <span>{notifications.filter((item) => !item.read).length} unread</span>
          </div>

          {notifications.length === 0 ? (
            <div className="dashboard-empty">No notifications yet.</div>
          ) : (
            notifications.slice(0, 4).map((notification) => (
              <div className="activity-row" key={notification.id}>
                <span>{notification.type}</span>
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
              </div>
            ))
          )}
        </section>
      </div>

      <section className="dashboard-panel">
        <div className="dashboard-panel-heading">
          <h2>Recent Activity</h2>
          <span>{recentActivity.length} updates</span>
        </div>

        {recentActivity.length === 0 ? (
          <div className="dashboard-empty">No activity yet.</div>
        ) : (
          recentActivity.map((item) => (
            <div className="activity-row" key={item.id}>
              <span>{item.label}</span>
              <strong>{item.text}</strong>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
