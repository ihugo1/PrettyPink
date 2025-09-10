import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import { Footer } from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <>
      <Toaster
        position="bottom-right" // Posición por defecto
        toastOptions={{
          style: {
            background: "#2d2d2d",
            color: "#fff",
            borderRadius: "8px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
          duration: 4000,

          success: {
            style: {
              background: "#4CAF50", 
            },
          },
          error: {
            style: {
              background: "#F44336", 
            },
          },
        }}
      />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
