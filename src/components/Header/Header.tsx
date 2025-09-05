import styles from "./Header.module.css";
import { Logo } from "../Logo/Logo";
import { FaBars, FaX } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Cart } from "../Cart/Cart";
import { Navigation } from "./Navigation/Navigation";
import { CartButton } from "./CartButton/CartButton";
import { LoginButton } from "./LoginButton/LoginButton";
import { MobileMenu } from "./MobileMenu/MobileMenu";

export const navLinks = [
  { link: "Home", label: "Home", route: "/" },
  { link: "Catalog", label: "Catalog", route: "/catalog" },
  { link: "About", label: "About", route: "/about" },
];

export const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  return (
    <header
      className={`${styles.header} ${
        isScrolled || location.pathname.startsWith("/product/")
          ? styles.scrolled
          : ""
      }`}
    >
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      <div className={styles.desktopNav}>
        <Navigation linkClassName={styles.navLink} />
      </div>

      <div className={styles.actions}>
        <CartButton onClick={handleCartOpen} />
        <LoginButton />
        <button className={styles.menuButton} onClick={handleMenuToggle}>
          {menuOpen ? <FaX /> : <FaBars />}
        </button>
      </div>

      <MobileMenu isOpen={menuOpen} />

      <Cart isOpen={cartOpen} hanldeCloseCart={handleCartClose} />
    </header>
  );
};
