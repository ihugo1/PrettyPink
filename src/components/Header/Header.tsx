import styles from "./Header.module.css";
import { Logo } from "../Logo/Logo";
import { FaCartShopping, FaUser, FaBars, FaX } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { link: "Home", label: "Home", route: "/" },
    { link: "About", label: "Catalog", route: "/catalog" },
    { link: "Contact", label: "About", route: "/about" },
  ];

  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  return (
    <header className={`${styles.header} ${isScrolled || location.pathname.startsWith("/product/") ? styles.scrolled : ""}`}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <Link key={link.link} className={styles.navLink} to={link.route}>
            <p>{link.label}</p>
          </Link>
        ))}
      </ul>

      <div
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuActive : ""
        }`}
      >
        {navLinks.map((link) => (
          <Link key={link.link} className={styles.menuLink} to={link.route}>
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.cartButton}>
          <FaCartShopping />
        </button>
        <button className={styles.loginButton}>
          <FaUser />
        </button>
        <button className={styles.menuButton} onClick={handleMenuOpen}>
          {menuOpen ? <FaX /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};
