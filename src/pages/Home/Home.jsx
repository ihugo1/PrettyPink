import React from "react";
import style  from "./Home.module.css";
import { BestSellers } from "../../components/BestSellers/BestSellers.jsx";
import background from "../../assets/img/hero/home.png"

export const Home = () => {
  return (
    <div className={style['home']}>
      <div className={style["home-hero"]}>
        <img src={background} alt="" className={style["background-img"]} />
        <div className={style["content"]}>
          <p className={style["slogan"]}>
            Transform your look, conquer the world.
          </p>
        </div>
      </div>
      <BestSellers />
    </div>
  );
};
