import React from "react";
import { HomeHero, BestSellers } from "./HomeComponents";
import { Footer } from "../../components/GlobalComponents";

export const Home = () => {
  return (
    <div>
      <HomeHero />
      <BestSellers />
      <Footer />
    </div>
  );
};
