import styles from "./Header.module.css";
import { Logo } from "../Logo/Logo";
import { FaCartShopping, FaUser, FaBars, FaX } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Cart } from "../Cart/Cart";

const navLinks = [
  { link: "Home", label: "Home", route: "/" },
  { link: "About", label: "Catalog", route: "/catalog" },
  { link: "Contact", label: "About", route: "/about" },
];

export const Header = () => {
  const location = useLocation();
  const { session, signInWithGoogle, signOut } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const handleMenuOpen = () => setMenuOpen(!menuOpen);
  const handleLoginModalOpen = () => setLoginModalOpen(!loginModalOpen);
  const handleCartOpen = () => setCartOpen(!cartOpen);

  return (
    <header
      className={`${styles.header} ${
        isScrolled || location.pathname.startsWith("/product/")
          ? styles.scrolled
          : ""
      }`}
    >
      {/* LOGO */}
      <div className={styles.logoContainer}>
        <Logo />
      </div>

      {/* NAV LINKS */}
      <ul className={styles.navLinks}>
        {navLinks.map((link) => (
          <Link key={link.link} className={styles.navLink} to={link.route}>
            <p>{link.label}</p>
          </Link>
        ))}
      </ul>

      {/* MOBILE MENU */}
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

      {/* ACTIONS */}
      <div className={styles.actions}>
        <button className={styles.cartButton} onClick={handleCartOpen}>
          <FaCartShopping />
        </button>
        <button className={styles.loginButton} onClick={handleLoginModalOpen}>
          {session?.user ? (
            session.user.user_metadata?.avatar_url ||
            session.user.user_metadata?.picture ? (
              <img
                src={
                  session.user.user_metadata.avatar_url ||
                  session.user.user_metadata.picture
                }
                className={styles.avatarImage}
              />
            ) : session.user.user_metadata?.name ? (
              <div className={styles.avatarInitial}>
                {session.user.user_metadata.name[0].toUpperCase()}
              </div>
            ) : (
              <FaUser />
            )
          ) : (
            <FaUser />
          )}
        </button>
        <button className={styles.menuButton} onClick={handleMenuOpen}>
          {menuOpen ? <FaX /> : <FaBars />}
        </button>
      </div>

      {/* LOGIN MODAL */}
      <div
        className={`${styles.loginModal} ${
          loginModalOpen ? `${styles.loginModalOpen}` : ""
        }`}
      >
        <div className={styles.userInfoContainer}>
          {session && session.user ? (
            <>
              <p>Logged as:</p>
              <p>{session.user.user_metadata?.name}</p>
            </>
          ) : (
            <p></p>
          )}
        </div>
        <div className={styles.modalButtons}>
          <button
            onClick={session && session.user ? signOut : signInWithGoogle}
          >
            {session && session.user ? (
              <>Logout</>
            ) : (
              <>
                <FcGoogle />
                Sign in
              </>
            )}
          </button>
          <button onClick={handleLoginModalOpen}>Close</button>
        </div>
      </div>

      {/* CART */}
      <Cart isOpen={cartOpen} hanldeCloseCart={() => setCartOpen(false)} />
    </header>
  );
};
