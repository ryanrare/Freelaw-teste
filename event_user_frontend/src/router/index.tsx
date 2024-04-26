import { Routes as RoutesDOM, Route } from "react-router-dom";
import Home from "../pages/Home";
import Event from "../pages/Event";
import Users from "../pages/Users";
import Reports from "../pages/Reports";
import SignInSide from "../pages/SignInSide";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";

export const Routes = () => {
  return (
    <RoutesDOM>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/events"
        element={
          <PrivateRoute>
            <Event />
          </PrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<SignInSide />} />
      <Route path="/register" element={<SignUp />} />
    </RoutesDOM>
  );
};
