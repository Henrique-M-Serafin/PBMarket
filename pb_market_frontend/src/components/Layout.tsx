import { LogOut, ShoppingCart, User } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";


export function Layout() {
    const user = useAuth()
    const navigate = useNavigate();
    const {theme, toggleTheme} = useTheme();

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
        <header className="flex justify-between bg-card p-4 border-b-1 border-primary">
            <h1 className="text-2xl text-primary font-bold ">PB Market</h1>
            <div className="flex gap-4 items-center">
                <Switch checked={theme === "dark"} onCheckedChange={toggleTheme}></Switch>
                <Button><User />{ user ? user?.user?.name : "Usuário"}</Button>
                <Button onClick={() => navigate("/")}><LogOut /> Sair</Button>
            </div>
        </header>
        <main className="flex-grow container bg-secondary mx-auto p-4">
            <Outlet />
        </main>

        
    </div>
  );        
}