import styles from "./Header.module.css";
import { Logo } from "../Logo/Logo";
import { FaCartShopping, FaUser, FaBars, FaX  } from "react-icons/fa6";
import { useState } from "react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { link: "Home", label: "Home" },
    { link: "About", label: "Catalog" },
    { link: "Contact", label: "About" },
  ];

  const handleMenuOpen = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.link} className={styles.navLink}>
            <a href={`#${link.link}`}>{link.label}</a>
          </li>
        ))}
      </ul>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuActive : ""}`}>
        {navLinks.map((link) => (
          <li key={link.link} className={styles.menuLink}>
            <a href={`#${link.link}`}>{link.label}</a>
          </li>
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
