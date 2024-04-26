import { NotificationData } from "../../types/notification";
import { getToken } from "./getToken";

export const fetchNotificationsData = async () => {
  try {
    const token = getToken();

    const response = await fetch("http://localhost:8000/users/notifications/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.length > 0) {
      return data.map(mapNotificationData);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const mapNotificationData = (data: NotificationData) => {
  return {
    id: data.notification.id,
    description: data.notification.description,
    type: data.notification.type,
    notificationExtraData: {
      sentBy: data.sent_by,
      sentAt: data.sent_at,
      eventId: data.event_id,
      eventTitle: data.event_title,
    },
  };
};
