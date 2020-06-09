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
  padding: 0.75em 0.75em;
  border-radius: 8px;
  text-align: center;
  line-height: 1.25em;
  background-color: white;
  ${({ theme }) => theme.baseShadow}
  color: ${({ theme }) => theme.colors.gray.normal};
  font-weight: 200;
  font-size: 0.85em;

  @media ${({ theme }) => theme.device.tablet} {
    font-size: 0.9em;
  }

  :active, :visited {
    color: ${({ theme }) => theme.colors.gray.normal};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.blue.normal};
    color: white;
    font-weight: 400;
  }
`;
