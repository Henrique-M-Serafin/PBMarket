import { createContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../services/authService";
import { getToken, setToken, removeToken } from "../utils/token";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  async function login(email: string, password: string) {
    const { token } = await loginRequest(email, password);
    setToken(token);
    setIsAuthenticated(true);
  }

  async function register(name: string, email: string, password: string) {
    await registerRequest(name, email, password);
  }

  function logout() {
    removeToken();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
