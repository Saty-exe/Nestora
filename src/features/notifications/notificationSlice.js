import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [
    {
      id: 1,
      userId: 1,
      audience: "resident",
      title: "Rent payment pending",
      message: "Your September rent is pending. Please pay during the payment window.",
      type: "payment",
      read: false,
      createdAt: "2026-09-01 09:00",
    },
    {
      id: 2,
      audience: "admin",
      title: "New visitor request",
      message: "A resident has a visitor request waiting for review.",
      type: "visitor",
      read: false,
      createdAt: "2026-09-01 10:15",
    },
  ],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notifications.unshift({
        id: Date.now(),
        read: false,
        createdAt: new Date().toLocaleString("en-IN"),
        ...action.payload,
      });
    },

    markNotificationRead(state, action) {
      const notification = state.notifications.find(
        (item) => item.id === action.payload,
      );

      if (notification) {
        notification.read = true;
      }
    },

    markAllNotificationsRead(state, action) {
      const { audience, userId } = action.payload;

      state.notifications.forEach((notification) => {
        const matchesAudience = notification.audience === audience;
        const matchesUser =
          audience === "admin" || notification.userId === userId;

        if (matchesAudience && matchesUser) {
          notification.read = true;
        }
      });
    },

    clearNotifications(state, action) {
      const { audience, userId } = action.payload;

      state.notifications = state.notifications.filter((notification) => {
        const matchesAudience = notification.audience === audience;
        const matchesUser =
          audience === "admin" || notification.userId === userId;

        return !(matchesAudience && matchesUser);
      });
    },
  },
});

export const {
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;
