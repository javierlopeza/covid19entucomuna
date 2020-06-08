import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBubbleButton = (props) => {
  const { children, path, onClick: clickHandler } = props;
  return (
    <NavLink exact to={path} onClick={clickHandler}>
      {children}
    </NavLink>
  );
};

export default NavBubbleButton;
