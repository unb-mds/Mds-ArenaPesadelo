import { createContext, FC, ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";
import { UserAccess } from "../utils/enums";

interface ICredentials {
  email: string;
  password: string;
}

interface IUser {
  id: string;
  full_name: string;
  registration: string;
  email: string;
  access: UserAccess;
}

interface IUpdateUserData {
  fullName?: string;
  email?: string;
  password?: string;
  registration?: string;
  oldPassword?: string;
}

export interface IAuthContext {
  login(data: ICredentials): Promise<void>;
  logout(): Promise<void>;
  toggleLoginModal(): void;
  update(data: IUpdateUserData): Promise<void>;

  user?: IUser | null;

  token: string;

  showLoginModal: boolean;
}

interface IAuthProvider {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [user, setUser] = useState<IUser | null | undefined>(undefined);
  const [token, setToken] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function getStoredSession() {
      const session = localStorage.getItem('@Pesadelo:Auth');

      if (session) {
        const parsedStoredSession = JSON.parse(session);

        setToken(parsedStoredSession.token);
        setUser(parsedStoredSession.user);

        api.defaults.headers.authorization = `Bearer ${parsedStoredSession.token}`;
      } else {
        setUser(null);
      }
    }

    getStoredSession();
  }, []);

  const login = useCallback(async (credentials: ICredentials) => {
    const { data } = await api.post(`/users/sessions`, credentials);

    const session = {
      user: data.user,
      token: data.token,
    };

    localStorage.setItem('@Pesadelo:Auth', JSON.stringify(session));

    api.defaults.headers.authorization = `Bearer ${session.token}`;

    setToken(session.token);
    setUser(session.user);
  }, []);

  const logout = useCallback(async () => {
    api.defaults.headers.authorization = ``;

    localStorage.removeItem('@Pesadelo:Auth');

    setUser(null);
    setToken('');
  }, []);

  const toggleLoginModal = useCallback(() => {
    setShowLoginModal(oldState => !oldState);
  }, []);

  const update = useCallback(async (data: IUpdateUserData) => {
    const { data: updatedUser } = await api.put(`/users`, data);

    setUser(updatedUser);

    const oldSession = localStorage.getItem('@Pesadelo:Auth') as string;
    const parsedSession = JSON.parse(oldSession);

    parsedSession.user = updatedUser;

    localStorage.setItem('@Pesadelo:Auth', JSON.stringify(parsedSession));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        token,
        user,
        toggleLoginModal,
        showLoginModal,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
