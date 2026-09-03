import { useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../features/notifications/notificationSlice";
import {
  selectNotificationsFor,
  selectUnreadNotificationCount,
} from "../../features/selectors";

export default function NotificationDropdown({ audience, userId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const notifications = useSelector((state) =>
    selectNotificationsFor(state, audience, userId),
  );

  const unreadCount = useSelector((state) =>
    selectUnreadNotificationCount(state, audience, userId),
  );

  const latestNotifications = useMemo(
    () => notifications.slice(0, 6),
    [notifications],
  );

  const scope = { audience, userId };

  return (
    <div className="notification-menu">
      <button
        type="button"
        className="notification-btn"
        onClick={() => setOpen((value) => !value)}
        aria-label="Notifications"
      >
        <Bell size={18} strokeWidth={2.2} />
        {unreadCount > 0 && (
          <span className="notification-count">{unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <strong>Notifications</strong>
            <span>{unreadCount} unread</span>
          </div>

          {latestNotifications.length === 0 ? (
            <div className="notification-empty">No notifications yet.</div>
          ) : (
            <div className="notification-list">
              {latestNotifications.map((notification) => (
                <button
                  type="button"
                  key={notification.id}
                  className={
                    notification.read
                      ? "notification-item"
                      : "notification-item unread"
                  }
                  onClick={() =>
                    dispatch(markNotificationRead(notification.id))
                  }
                >
                  <strong>{notification.title}</strong>
                  <span>{notification.message}</span>
                  <small>{notification.createdAt}</small>
                </button>
              ))}
            </div>
          )}

          <div className="notification-actions">
            <button
              type="button"
              onClick={() => dispatch(markAllNotificationsRead(scope))}
            >
              Mark read
            </button>
            <button
              type="button"
              onClick={() => dispatch(clearNotifications(scope))}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
