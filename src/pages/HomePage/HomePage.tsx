import styles from "./HomePage.module.css";
import { Hero } from "./Hero/Hero";

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Hero />
    </div>
  )
}
