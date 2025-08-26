import styles from "./Hero.module.css";
import heroVideo from "../../../assets/videos/herovideo.mp4";

export const Hero = () => {
  return (
    <div className={styles.hero}>
      <video
        className={styles.video}
        src={heroVideo}
        autoPlay
        loop
        muted
      ></video>
      <div className={styles.content}>
        <h3 className={styles.title}>More than clothes, it's an attitude</h3>
        <h4 className={styles.subtitle}>
          Refresh your wardrobe with versatile pieces that fit your lifestyle
        </h4>
      </div>
    </div>
  );
};
