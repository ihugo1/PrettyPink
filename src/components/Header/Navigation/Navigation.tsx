import { Link } from "react-router-dom";
import { navLinks } from "../Header";
import styles from "./Navigation.module.css";

interface Props {
  className?: string;
  linkClassName?: string;
}

export const Navigation = ({ className, linkClassName }: Props) => {
  return (
    <ul className={`${styles.navLinks} ${className}`}>
      {navLinks.map((link) => (
        <Link key={link.link} className={linkClassName} to={link.route}>
          <p>{link.label}</p>
        </Link>
      ))}
    </ul>
  );
};