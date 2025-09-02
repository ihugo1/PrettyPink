import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import styles from "./Footer.module.css";
import { FaPinterest, FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";

const socialLinks = [
  { icon: <FaPinterest />, url: "https://www.pinterest.com/" },
  { icon: <FaInstagram />, url: "https://www.instagram.com/" },
  { icon: <FaTiktok />, url: "https://www.tiktok.com/" },
  { icon: <FaFacebook />, url: "https://www.facebook.com/" },
];

const footerNavLinks = [
  { name: "Home", path: "/" },
  { name: "Catalog", path: "/catalog" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <Logo />
          <p className={styles.tagline}>Your one-stop shop for pretty things.</p>
        </div>

        <div className={styles.navSection}>
          <h4>Navigation</h4>
          <ul className={styles.navList}>
            {footerNavLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className={styles.navLink}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.socialSection}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            {socialLinks.map((link) => (
              <a href={link.url} key={link.url} className={styles.socialLink} target="_blank" rel="noopener noreferrer">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.copyrightSection}>
        <p>&copy; {currentYear} PRETTY P!NK. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
