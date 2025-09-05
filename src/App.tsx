import { Header } from "./components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";
import { CatalogPage } from "./pages/CatalogPage/CatalogPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename="/PrettyPink">
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
};
