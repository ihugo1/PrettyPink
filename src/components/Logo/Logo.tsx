import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link className={styles.logo} to={"/"}>
      <section className={styles.pretty}>PRETTY</section>
      <section className={styles.pink}>P!NK</section>
    </Link>
  )
}
