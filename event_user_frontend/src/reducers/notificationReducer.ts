import {
  NotificationType,
  NotificationGenericType,
} from "../types/notification";

const initialState: NotificationGenericType[] = [];

export const notificationsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, action.payload];
    case "REMOVE_NOTIFICATION":
      return state.filter(
        (notification: NotificationGenericType) =>
          notification.id !== action.payload
      );
    case "ADD_NOTIFICATIONS":
      return [...state, ...action.payload];
    case "RESET_NOTIFICATIONS":
      return initialState;
    default:
      return state;
  }
};
