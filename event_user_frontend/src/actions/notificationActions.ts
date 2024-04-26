import { NotificationType } from "../types/notification";

export const addNotification = (notification: NotificationType) => ({
  type: "ADD_NOTIFICATION",
  payload: notification,
});

export const removeNotification = (id: string) => ({
  type: "REMOVE_NOTIFICATION",
  payload: id,
});

export const addNotifications = (notifications: NotificationType[]) => ({
  type: "ADD_NOTIFICATIONS",
  payload: notifications,
});

export const resetNotifications = () => ({
  type: "RESET_NOTIFICATIONS",
});
