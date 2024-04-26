import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/authActions";

const initialState = {
  isLoggedIn: false,
  token: null,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state;
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return state;
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    default:
      const token = localStorage.getItem("token");
      return {
        ...state,
        isLoggedIn: !!token,
        token: token,
      };
  }
};

export default authReducer;
