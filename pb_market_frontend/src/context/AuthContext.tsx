import { createContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../services/authService";
import { getToken, setToken, removeToken } from "../utils/token";
import type { User } from "@/types/User";



interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  async function login(email: string, password: string) {
    const response = await loginRequest(email, password);

    setToken(response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setUser(response.user);
    setIsAuthenticated(true);
  }

  async function register(name: string, email: string, password: string) {
    await registerRequest(name, email, password);
  }

  function logout() {
    removeToken();
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
