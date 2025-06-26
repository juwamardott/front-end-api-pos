import { Navigate } from "react-router-dom";
import useAuth from "../store/auth";

export default function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}
