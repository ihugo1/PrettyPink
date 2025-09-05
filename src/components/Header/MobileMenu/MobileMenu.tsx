import { Navigation } from "../Navigation/Navigation";
import styles from "./MobileMenu.module.css";

interface Props {
  isOpen: boolean;
}

export const MobileMenu = ({ isOpen }: Props) => {
  return (
    <div
      className={`${styles.mobileMenu} ${
        isOpen ? styles.mobileMenuActive : ""
      }`}
    >
      <Navigation
        className={styles.mobileNav}
        linkClassName={styles.menuLink}
      />
    </div>
  );
};