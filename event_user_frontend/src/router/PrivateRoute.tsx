import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: any) => {
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  try {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    return <Navigate to="/login" replace />;
  } finally {
    <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
