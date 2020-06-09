import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const NavBubbleButton = (props) => {
  const { children, path, onClick: clickHandler } = props;
  return (
    <Container>
      <ButtonLink exact to={path} onClick={clickHandler}>
        {children}
      </ButtonLink>
    </Container>
  );
};

export default NavBubbleButton;

const Container = styled.div`
  flex: 1;
  margin-bottom: 0.5em;

  @media ${({ theme }) => theme.device.tablet} {
    margin-bottom: 0;
    margin-left: 1em;
    &:first-child {
      margin-left: 0;
    }
  }
`;

const ButtonLink = styled(NavLink)`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  padding: 0.5em 0.75em;
  border-radius: 8px;
  text-align: center;
  line-height: 1.1em;
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
