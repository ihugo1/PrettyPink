import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <h1 className={styles.logo}>
      <section className={styles.pretty}>PRETTY</section>
      <section className={styles.pink}>P!NK</section>
    </h1>
  )
}
