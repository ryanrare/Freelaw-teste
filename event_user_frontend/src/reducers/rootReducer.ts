import { combineReducers } from "redux";
import { notificationsReducer } from "./notificationReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  auth: authReducer,
});

export default rootReducer;
