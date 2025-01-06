import React from "react";
import style from "./HomeHero.module.css";
import background from "../../../../assets/img/hero/home.png";

export const HomeHero = () => {
  return (
    <div className={style["home-hero"]}>
      <img src={background} alt="" className={style["background-img"]} />
      <div className={style["content"]}>
        <p className={style["slogan"]}>
          Transform your look, conquer the world.
        </p>
      </div>
    </div>
  );
};
