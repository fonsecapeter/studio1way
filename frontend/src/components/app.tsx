import React from "react";
import AppRoutes from "../routes";

export const App = () => (
  <div className="main-wrapper">
    <div className="left-column">
      {/* <img
        src={logo}
        className="logo"
        alt="P. Fonseca"
      /> */}
      {/* <Nav /> */}
    </div>
    <div className="right-column">
      <AppRoutes />
    </div>
  </div>
);

export default App;
