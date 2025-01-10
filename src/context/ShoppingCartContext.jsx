import React, { createContext, useState } from "react";

export const CartContext = createContext(null);

export const ShoppingCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0)

  const addToCart = (id, name, price, selectedSize, imgUrl) => {
    const cartProduct = {
      cartId: id + selectedSize,
      productId: id,
      name: name,
      price: price,
      size: selectedSize,
      imgUrl: imgUrl
    };
    setTotalCart(Number((totalCart + price).toFixed(2)));
    setCart([...cart, cartProduct]);
  };

  const removeFromCart = (id) => {
    const index = cart.findIndex((item) => item.cartId === id);
    if (index !== -1) {
      const productToRemove = cart[index]; 
      const updatedCart = [...cart];
      updatedCart.splice(index, 1); 
      setTotalCart(Number((totalCart - productToRemove.price).toFixed(2)));
      setCart(updatedCart); 
    }
  };;


  const clearCart = () => {
    setCart([]);
    setTotalCart(0);
  }

  const contextValue = {
    cart,
    addToCart,
    removeFromCart, 
    clearCart,
    totalCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
