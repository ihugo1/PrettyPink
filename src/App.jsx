import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Footer } from "./components/GlobalComponents.js";
import { Home, Product, Products, Login } from "./pages/pages.js";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.jsx";

export const App = () => {
  return (
    <ShoppingCartProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<Product />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ShoppingCartProvider>
  );
};
