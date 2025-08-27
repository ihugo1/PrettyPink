import styles from "./SocialLinks.module.css";
import { FaPinterest, FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import background from "../../../assets/images/mike-von-dwvtsZsyTZw-unsplash.webp";

const socialLinks = [
  { icon: <FaPinterest />, url: "https://www.pinterest.com/" },
  { icon: <FaInstagram />, url: "https://www.instagram.com/" },
  { icon: <FaTiktok />, url: "https://www.tiktok.com/" },
  { icon: <FaFacebook />, url: "https://www.facebook.com/" },
];

export const SocialLinks = () => {
  return (
    <div className={styles.socialLinks}>
      <img className={styles.background} src={background} />
      <div className={styles.content}>
        <h2>Follow us!</h2>
        <h3>Connect with us on social media, and don't miss any new</h3>
        <div className={styles.links}>
          {socialLinks.map((link) => (
            <a href={link.url} key={link.url} className={styles.link} title={link.url}>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
