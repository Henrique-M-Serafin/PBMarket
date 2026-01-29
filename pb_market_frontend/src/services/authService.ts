import api from "@/api/api";

interface LoginResponse {
  token: string;
}


export async function loginRequest(email: string, password: string) {
  const response = await api.post<LoginResponse>("/login", { email, password });
  return response.data;
}

export async function registerRequest(name: string, email: string, password: string) {
  await api.post("/register", { name, email, password });
}
