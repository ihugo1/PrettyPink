import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
};
