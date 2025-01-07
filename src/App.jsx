import React from "react";
import { Navbar } from "./components/GlobalComponents.js";
import { Home } from "./pages/Home/Home";

export const App = () => {
  return <div>
    <Navbar/>
    <Home/>
  </div>;
};
