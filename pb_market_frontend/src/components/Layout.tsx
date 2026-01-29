import { LogOut, Moon, ShoppingCart, Sun, User } from "lucide-react";
import { Outlet  } from "react-router-dom";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";


export function Layout() {
    const { logout } = useAuth()
    const user = useAuth()
    const {theme, toggleTheme} = useTheme();

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
        <header className="flex justify-between bg-card p-4 border-b-1 border-primary">
            <h1 className="lg:text-2xl text-lg text-primary font-bold flex items-center gap-2"><ShoppingCart className="hidden lg:flex" />PB Market</h1>
            <div className="flex gap-4 justify-center items-center">
               {theme === "dark" ? <Moon className="hidden lg:flex h-6 w-6"/> : <Sun  className=" hidden lg:flex h-6 w-6" />}
                <Switch checked={theme === "dark"} onCheckedChange={toggleTheme}></Switch>
                <Button><User />{ user ? user?.user?.name : "Usuário"}</Button>
                <Button onClick={() => logout()}><LogOut /> Sair</Button>
            </div>
        </header>
        <main className="flex-grow container bg-secondary mx-auto p-4">
            <Outlet />
        </main>

        
    </div>
  );        
}