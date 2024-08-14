import { useContext } from "react";
import { AuthContext, IAuthContext } from "../contexts/AuthContext";

export default function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}
