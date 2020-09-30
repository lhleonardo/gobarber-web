import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface UserAPI {
  id: string;
  name: string;
  email: string;
  avatarURL: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: UserAPI;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;

  updateUser(data: UserAPI): void;
}

interface AuthState {
  token: string;
  user: UserAPI;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber/token');
    const user = localStorage.getItem('@GoBarber/user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/sessions', { email, password });

    const { user, token } = response.data;

    localStorage.setItem('@GoBarber/token', token);
    localStorage.setItem('@GoBarber/user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber/token');
    localStorage.removeItem('@GoBarber/user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: UserAPI) => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem('@GoBarber/user', JSON.stringify(user));
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user as UserAPI, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider');
  }

  return context;
}
