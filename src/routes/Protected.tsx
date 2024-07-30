import { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from 'react-router-dom';

interface IProtected {
  children: ReactNode;
}

export const Protected: FC<IProtected> = ({ children }) => {
  const { user } = useAuth();

  if (typeof user === 'undefined') return <span>Carregando...</span>;

  if (user === null) return <Navigate to="/" />

  return children;
}
