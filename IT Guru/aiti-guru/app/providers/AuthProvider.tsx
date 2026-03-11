// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  token: string | null;
  login: (token: string, remember: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  // Восстанавливаем токен при загрузке
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (storedToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setToken(storedToken);
    }
  }, []);

  const login = (newToken: string, remember: boolean) => {
    if (remember) {
      localStorage.setItem('authToken', newToken);
    } else {
      sessionStorage.setItem('authToken', newToken);
    }
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};