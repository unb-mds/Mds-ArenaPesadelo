import { FC, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from 'react-router-dom';
import { UserAccess } from "../utils/enums";

interface IRestricted {
  children: ReactNode;
}

export const Restricted: FC<IRestricted> = ({ children }) => {
  const { user } = useAuth();

  if (typeof user === 'undefined') return <span>Carregando...</span>;

  if (user === null) return <Navigate to="/" />

  if (user.access !== UserAccess.ADMIN) return <span>Acesso restrito!</span>

  return children;
}
