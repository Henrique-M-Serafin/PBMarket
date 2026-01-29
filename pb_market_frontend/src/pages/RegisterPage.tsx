import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerRequest } from "@/services/authService";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function RegisterPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();

        try{
            setLoading(true);
            await registerRequest(formData.name, formData.email, formData.password);
            toast.success("Registro realizado com sucesso! Faça login para continuar.");
            navigate("/");
        } catch (error) {
            toast.error("Erro ao registrar. Verifique seus dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary">
        <h1 className="text-2xl font-bold mb-4">Página de Registro PB Market</h1>
        <Card className="w-xs lg:w-lg"> 
            <CardHeader>
                <CardTitle>Registro</CardTitle>
                <CardDescription>Crie sua conta para acessar o sistema.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRegister}>
                <FieldGroup className="flex flex-col gap-2 mb-4">
                    <FieldLabel htmlFor="name-input">Nome</FieldLabel>
                    <Input onChange={e => setFormData({...formData, name: e.target.value})} id="name-input" autoComplete="off" placeholder="Digite seu nome"></Input>
                    <FieldLabel htmlFor="email-input">Email</FieldLabel>
                    <Input onChange={e => setFormData({...formData, email: e.target.value})} id="email-input" autoComplete="off"  placeholder="Digite seu email"></Input>
                    <FieldLabel htmlFor="password-input">Senha</FieldLabel>
                    <Input onChange={e => setFormData({...formData, password: e.target.value})} id="password-input" type="password" autoComplete="off" placeholder="Digite sua senha"></Input>
                </FieldGroup>
                <Button className="w-full mb-2" type="submit">{loading ? "Criando..." : "Criar Conta"}</Button>
                </form>
                <Button className="w-full" variant="link" onClick={() => navigate("/")}>Já possui uma conta? Faça login</Button>
            </CardContent>
        </Card>
    </main>
  );
}