import React, { useState, useContext } from "react";
import style from "./Payment.module.css";
import { PaymentForm } from "./PaymentForm/PaymentForm";
import { CartContext } from "../../context/ShoppingCartContext";

export const Payment = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const handleRemoveFromCart = (id) => removeFromCart(id);

  return (
    <div className={style["payment"]}>
      <div className={style["payment-top"]}>
        <h1>Set order</h1>
      </div>
        <div className={style["cart-list"]}>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div className={style["cart-item"]}>
                <img className={style["product-img"]} src={item.imgUrl} />
                <div className={style["product-info"]}>
                  <div className={style["product-info-section"]}>
                    <p className={style["label"]}>Product:</p>
                    <p className={style["info"]}>{item.name}</p>
                  </div>
                  <div className={style["product-info-section"]}>
                    <p className={style["label"]}>Size:</p>
                    <p className={style["info"]}>{item.size}</p>
                  </div>
                  <div className={style["product-info-section"]}>
                    <p className={style["label"]}>Price:</p>
                    <p className={style["info"]}>${item.price}</p>
                  </div>
                </div>
                <button
                  className={style["remove-button"]}
                  onClick={() => handleRemoveFromCart(item.cartId)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div>Your cart is empty</div>
          )}
        </div>
      {cart.length > 0 ? <PaymentForm /> : null}
    </div>
  );
};
