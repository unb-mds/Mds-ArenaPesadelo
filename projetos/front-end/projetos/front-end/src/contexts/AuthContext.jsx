import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState('');

  useEffect(() => {
    async function initAuth() {
      const session = localStorage.getItem('Pesadelo@AuthData');

      if (!session) {
        setToken('');
        setUser(undefined);

        return;
      }

      const parsedSession = JSON.parse(session);

      setToken(parsedSession.token);
      setUser(parsedSession.user);
    }

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    console.log({ email, password });

    const userToStore = {
      name: 'John Doe',
      email,
    };
    const token = Math.floor(Math.random() * 1E5).toString();

    setToken(token);
    setUser(userToStore);

    const session = {
      user: userToStore,
      token,
    };

    localStorage.setItem('Pesadelo@AuthData', JSON.stringify(session));
  }, []);

  const logout = useCallback(async () => {
    setToken('');
    setUser(undefined);

    localStorage.removeItem('Pesadelo@AuthData');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logout,
        user,
        token,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
