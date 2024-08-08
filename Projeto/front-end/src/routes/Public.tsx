import { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from 'react-router-dom';

interface IPublic {
  children: ReactNode;
}

export const Public: FC<IPublic> = ({ children }) => {
  const { user } = useAuth();

  if (user) return <Navigate to="/home" />

  return children;
}
