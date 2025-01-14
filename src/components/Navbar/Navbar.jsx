import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { CartModal } from "./CartModal/CartModal";
import { CartContext } from "../../context/ShoppingCartContext";
import { FaBars, FaCartShopping, FaXmark } from "react-icons/fa6";

export const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  const toggleCart = () => {
    setCartIsOpen(!cartIsOpen);
    setMenuIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuIsOpen || cartIsOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuIsOpen, cartIsOpen]);

  return (
    <nav className={style["navbar"]}>
      <div className={style["navbar-left"]}>
        <Link to="/" className={style["navbar-logo"]}>
          <p className={style["logo-a"]}>PRETTY</p>
          <p className={style["logo-b"]}> P!NK </p>
        </Link>
      </div>
      <div className={style["navbar-right"]}>
        <button className={style["menu-button"]} onClick={toggleMenu}>
          {menuIsOpen ? (
            <FaXmark className={style["menu-button-icon"]} />
          ) : (
            <FaBars className={style["menu-button-icon"]} />
          )}
        </button>

        <ul
          className={`${style["navbar-links"]} ${
            menuIsOpen ? style["navbar-links-active"] : ""
          }`}
        >
          <button className={style["navbar-cart-button"]} onClick={toggleCart}>
            <FaCartShopping className={style["navbar-cart-button-icon"]} />
            {cart.length > 0 ? (
              <p className={style["navbar-cart-total"]}>{cart.length}</p>
            ) : null}
          </button>
          <Link
            to="/products"
            className={style["navbar-link"]}
            onClick={toggleMenu}
          >
            All products
          </Link>
          <a className={style["navbar-link"]}>About us</a>
        </ul>
      </div>
      <CartModal cartIsOpen={cartIsOpen} toggleCart={toggleCart} />
    </nav>
  );
};
