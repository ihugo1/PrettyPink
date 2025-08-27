import { useState } from "react";
import styles from "./NewsletterSignup.module.css";
import background from "../../../assets/images/mike-von-wINYGcOk-Ps-unsplash.webp";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <div className={styles.newsLetterSignup}>
      <img src={background} className={styles.background} />
      <div className={styles.content}>
        <h2>Suscribe to our newsletter</h2>
        <h3>
          Be the first to get the latest news about trends, promotions and much
          more!
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};
