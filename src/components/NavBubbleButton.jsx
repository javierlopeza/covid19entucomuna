import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavBubbleButton = (props) => {
  const { children, path, onClick: clickHandler } = props;
  return (
    <Container exact to={path} onClick={clickHandler}>
      {children}
    </Container>
  );
};

export default NavBubbleButton;

const Container = styled(NavLink)`
  padding: 0.5em 0.75em;
  border-radius: 8px;
  background-color: white;
  ${({ theme }) => theme.baseShadow}
  color: ${({ theme }) => theme.colors.gray.normal};
  font-weight: 200;

  :active, :visited {
    color: ${({ theme }) => theme.colors.gray.normal};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.blue.normal};
    color: white;
    font-weight: 400;
  }

  :not(.active) {
    transition: all 0.3s ease-in-out;

    @media (hover: hover) {
      background: linear-gradient(
        to left,
        white 50%,
        ${({ theme }) => theme.colors.blue.normal} 50%
      );
      background-size: 201% 100%;
      background-position: right bottom;

      :hover {
        color: white;
        background-position: left bottom;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;
