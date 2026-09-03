export const selectLoggedInUser = (state) => state.user?.loggedInUser ?? null;

export const selectTenants = (state) => state.tenant?.tenant ?? [];

export const selectCurrentTenant = (state) => {
  const user = selectLoggedInUser(state);
  const tenants = selectTenants(state);

  return tenants.find((tenant) => tenant.id === user?.id) ?? user;
};

export const getPaymentSnapshot = (payment, date = new Date()) => {
  if (!payment) {
    return null;
  }

  const day = date.getDate();
  const paymentWindow = day >= 1 && day <= 7;
  const isPending = payment.paymentStatus !== "Paid";
  const lateFeePerDay = payment.lateFeePerDay ?? 100;
  const lateFee = isPending && day > 7 ? (day - 7) * lateFeePerDay : 0;
  const pendingRent = isPending ? payment.pendingRent || payment.monthlyRent || 0 : 0;
  const totalPending = isPending ? pendingRent + lateFee : 0;
  const status = isPending && day > 7 ? "Overdue" : payment.paymentStatus;

  return {
    ...payment,
    paymentWindow,
    lateFee,
    pendingRent,
    totalPending,
    displayStatus: status,
  };
};

export const selectPaymentSnapshot = (state, tenantId) => {
  const tenant = selectTenants(state).find((item) => item.id === tenantId);

  return getPaymentSnapshot(tenant?.payment);
};

export const selectNotificationsFor = (state, audience, userId) => {
  const notifications = state.notification?.notifications ?? [];

  return notifications.filter((notification) => {
    if (notification.audience !== audience) {
      return false;
    }

    return audience === "admin" || notification.userId === userId;
  });
};

export const selectUnreadNotificationCount = (state, audience, userId) => {
  return selectNotificationsFor(state, audience, userId).filter(
    (notification) => !notification.read,
  ).length;
};
