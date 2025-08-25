import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <h1 className={styles.logo}>
      <section className={styles.pretty}>Pretty</section>
      <section className={styles.pink}>Pink</section>
    </h1>
  )
}
