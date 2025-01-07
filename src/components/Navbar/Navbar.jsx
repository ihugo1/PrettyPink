import React, { useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { FaBars } from "react-icons/fa6";
import { FaCartShopping, FaXmark } from "react-icons/fa6";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={style["navbar"]}>
      <div className={style["navbar-left"]}>
        <div className={style["navbar-logo"]}>
          <p className={style["logo-a"]}>PRETTY</p>
          <p className={style["logo-b"]}> P!NK </p>
        </div>
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
          <a className={style["navbar-link"]}>
            <FaCartShopping className={style["navbar-link-icon"]} />
          </a>
          <a className={style["navbar-link"]}>All products</a>
          <a className={style["navbar-link"]}>About us</a>
          <a className={style["navbar-link"]}>Login/Register</a>
        </ul>
      </div>
    </nav>
  );
};
