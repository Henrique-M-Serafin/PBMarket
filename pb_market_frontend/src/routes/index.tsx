import { Layout } from "@/components/Layout";
import { LoginPage } from "@/pages/LoginPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
            <Route path="/products" element={<ProductsPage />} />
        </Route>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
