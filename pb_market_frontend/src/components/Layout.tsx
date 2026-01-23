import { LogOut, ShoppingCart, User } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";


export function Layout() {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
        <header className="flex justify-between bg-primary-foreground p-4 border-b-1 border-primary">
            <h1 className="text-2xl text-primary font-bold ">PB Market</h1>
            <div className="flex gap-2 items-center">
                <Button><User />Usuário</Button>
                <Button><ShoppingCart /> Carrinho</Button>
                <Button onClick={() => navigate("/")}><LogOut /> Sair</Button>
            </div>
        </header>
        <main className="flex-grow container mx-auto p-4">
            <Outlet />
        </main>
        
    </div>
  );        
}