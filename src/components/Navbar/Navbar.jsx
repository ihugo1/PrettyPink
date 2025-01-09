import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { CartModal } from "./CartModal/CartModal";
import { CartContext } from "../../context/ShoppingCartContext";
import { FaBars, FaCartShopping, FaXmark } from "react-icons/fa6";

export const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleCart = () => setCartOpen(!cartOpen);

  useEffect(()=>{
    if (menuOpen || cartOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = ""; 
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen])

  return (
    <nav className={style["navbar"]}>
      <div className={style["navbar-left"]}>
        <Link to="/" className={style["navbar-logo"]}>
          <p className={style["logo-a"]}>PRETTY</p>
          <p className={style["logo-b"]}> P!NK </p>
        </Link>
      </div>
      <div className={style["navbar-right"]}>
        <button className={style["menu-button"]}>
          {menuOpen ? (
            <FaXmark
              className={style["menu-button-icon"]}
              onClick={toggleMenu}
            />
          ) : (
            <FaBars
              className={style["menu-button-icon"]}
              onClick={toggleMenu}
            />
          )}
        </button>
        <ul
          className={`${style["navbar-links"]} ${
            menuOpen ? style["navbar-links-active"] : ""
          }`}
        >
          <button className={style["navbar-cart-button"]} onClick={toggleCart}>
            <FaCartShopping className={style["navbar-cart-button-icon"]} />
            {
              cart.length>0 ? <p className={style['navbar-cart-total']}>{cart.length}</p> : null
            }
          </button>
          <Link to="/products" className={style["navbar-link"]}>All products</Link>
          <a className={style["navbar-link"]}>About us</a>
        </ul>
      </div>
      <CartModal toggleCart={cartOpen} setToggleCart={setCartOpen}/>
    </nav>
  );
};
