import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const PublicRoute = ({ children }) => {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/dashboard" />
  }

  return children;
}