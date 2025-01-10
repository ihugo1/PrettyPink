import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar/Navbar.jsx";
import { Footer } from "./components/Footer/Footer.jsx";

import { Home } from "./pages/Home/Home.jsx";
import { Product } from "./pages/Product/Product.jsx";
import { Products } from "./pages/Products/Products.jsx";
import { Payment } from "./pages/Payment/Payment.jsx";

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
            <Route path="/payment" element={<Payment/>}/>
          </Routes>
          <Footer />
        </div>
      </Router>
    </ShoppingCartProvider>
  );
};
