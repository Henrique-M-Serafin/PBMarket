import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
      navigate("/products");
    } catch (error) {
      toast.error("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex items-center min-h-screen w-full justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>PB Market</CardTitle>
          <CardDescription>
            Sistema de Gerenciamento de Estoque - PB Market
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <form onSubmit={handleSubmit} className="mx-2 flex flex-col gap-4">

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <Button disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            
          </form>
          <Button variant="link" onClick={() => navigate("/register")}>
              Não possui uma conta? Cadastre-se
            </Button>
        </CardContent>
      </Card>
    </main>
  );
}
