import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";

export function LoginPage() {
    const navigate = useNavigate();

    return <main className="flex items-center min-h-screen w-full justify-center">
       <Card className="w-xl ">
        <CardHeader>
            <CardTitle>PB Market</CardTitle>
            <CardDescription>Sistema de Gerenciamento de Estoque - PB Market</CardDescription>
        </CardHeader>
        <CardContent className="">
            <form onSubmit={() => {
                navigate('/products')
            }} className="mx-2 flex flex-col gap-2" action="">
                <div className=" flex flex-col gap-2">
                    <Label htmlFor="username">Usuário</Label>
                    <Input id="username" type="text" placeholder="Insira seu usuário"></Input>
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" placeholder="Insira sua senha"></Input>
                </div>
                <Button>Entrar</Button>
            </form>
        </CardContent>
       </Card>

    </main>;
}