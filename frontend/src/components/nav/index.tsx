import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavLink from './link';

const Nav = () => {
  const location = useLocation();
  const ABOUT = 'about';
  const SOMETHING_ELSE = 'something_else';
  const links = [ABOUT, SOMETHING_ELSE];
  let path = window.location.pathname;
  if (path.length === 0) {
    path = ABOUT;
  }
  useEffect(() => {
    path = window.location.pathname;
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav id="nav" className="nav">
      {links.map((link) => (
        <NavLink
          name={link}
          active={path === link}
          key={link}
        />
      ))}
    </nav>
  );
};

export default Nav;
