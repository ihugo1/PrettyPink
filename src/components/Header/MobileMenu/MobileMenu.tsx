import styles from "./MobileMenu.module.css";
import { Navigation } from "../Navigation/Navigation";
import { useLockScroll } from "../../../hooks/utils/useLockScroll";

interface Props {
  isOpen: boolean;
}

export const MobileMenu = ({ isOpen }: Props) => {
  useLockScroll(isOpen);

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