import React from "react";
import logoPath from "../assets/img/web/logo.svg";
import AppRoutes from "../routes";
import Nav from "./nav/index";

export const App = () => (
  <div className="main-wrapper">
    <div className="left-column">
      <img src={logoPath} className="logo" alt="P. Fonseca" />
      <Nav />
    </div>
    <div className="right-column">
      <AppRoutes />
    </div>
  </div>
);

export default App;
