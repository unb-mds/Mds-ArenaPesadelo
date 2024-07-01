import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"

export const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />
  }

  return children;
}