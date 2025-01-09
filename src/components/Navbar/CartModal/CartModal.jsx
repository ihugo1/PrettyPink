import React, { useContext } from "react";
import style from "./CartModal.module.css";
import { CartContext } from "../../../context/ShoppingCartContext";
import { FaTrashCan } from "react-icons/fa6";

export const CartModal = ({ toggleCart, setToggleCart }) => {
  const { cart, removeFromCart, clearCart, totalCart } =
    useContext(CartContext);

  const handleRemoveFromCart = (id) => removeFromCart(id);

  return (
    <div
      className={`${style["cart-modal"]} ${
        toggleCart ? style["cart-modal-active"] : null
      }`}
    >
      <div className={style["cart-modal-container"]}>
        <h1 className={style["title"]}> - My Cart - </h1>
        <div className={style["cart-list"]}>
          {cart.map((item) => (
            <div className={style["cart-item"]}>
              <img className={style["cart-item-img"]} src={item.imgUrl} />
              <p className={style["cart-item-name-and-size"]}>{`${item.name} (${item.size})`}</p>
              <p className={style["cart-item-price"]}>${item.price}</p>
              <button 
                className={style["cart-item-remove-button"]} 
                onClick={() => handleRemoveFromCart(item.cartId)}
              >
                <FaTrashCan />
              </button>
            </div>
          ))}
        </div>
        <div className={style["cart-bottom"]}>
          <div className={style["cart-bottom-total"]}>
            <b>Total:</b>${totalCart}
          </div>
          <div className={style["cart-bottom-buttons"]}>
            <button className={style["cart-bottom-button"]}>
              Start payment
            </button>
            <button
              className={style["cart-bottom-button"]}
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
            <button
              className={style["cart-bottom-button"]}
              onClick={() => setToggleCart(!toggleCart)}
            >
              Close Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
