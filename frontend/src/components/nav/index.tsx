import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "./link";

const Nav = () => {
  const location = useLocation();
  const THE_STUDIO = "/the-studio";
  const links = {
    "The Studio": THE_STUDIO,
    Portfolio: "/portfolio",
    Ceramics: "/ceramics",
    Paint: "/paint",
    Wood: "/wood",
    Other: "/other",
  };
  let currentPath = window.location.pathname;
  if (currentPath.length === 0 || currentPath === "/") {
    currentPath = THE_STUDIO;
  }
  useEffect(() => {
    currentPath = window.location.pathname;
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav id="nav" className="nav">
      {Object.entries(links).map(([name, to]) => (
        <NavLink name={name} to={to} active={to === currentPath} key={name} />
      ))}
    </nav>
  );
};

export default Nav;
