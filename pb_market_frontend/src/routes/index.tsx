import { Layout } from "@/components/Layout";
import { LoginPage } from "@/pages/LoginPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./routes";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/products" element={<ProductsPage />} />
          </Route>
        </Route>

        {/* Rotas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rota raiz inteligente */}
        <Route path="/" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
