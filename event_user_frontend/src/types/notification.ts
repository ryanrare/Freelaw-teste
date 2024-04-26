export type NotificationType = {
  id: number;
  description?: string;
  type?: string;
  notificationExtraData?: NotificationGenericTypeExtraDataMapped;
};

export type NotificationGenericType = {
  id: number;
  description: string;
  type: string;
  notificationExtraData: NotificationGenericTypeExtraData;
};

export enum NotificationActionTypes {
  ADD_NOTIFICATION = "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION",
  UPDATE_NOTIFICATION = "UPDATE_NOTIFICATION",
}
export type NotificationGenericTypeExtraData = {
  sent_by: number;
  sent_at: string;
  event_id: number;
  event_title: string;
};

export type NotificationGenericTypeExtraDataMapped = {
  sentBy: number;
  sentAt: string;
  eventId: number;
  eventTitle: string;
};

export type NotificationData = {
  notification: {
    id: number;
    description: string;
    type: string;
  };
  sent_by: number;
  sent_at: string;
  event_id: number;
  event_title: string;
};

export interface Notification {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}
