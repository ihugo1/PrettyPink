import styles from "./Hero.module.css";
import heroVideo from "../../../assets/videos/herovideo.mp4";
import { Button } from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigation = useNavigate();

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
        <Button
          variant="primary"
          size="large"
          onClick={() => navigation("/catalog")}
        >
          Shop now!
        </Button>
      </div>
    </div>
  );
};
