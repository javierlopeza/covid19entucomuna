import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FAQButton from './FAQButton';

const Logo = () => (
  <Container>
    <LogoLink to="/">COVID-19 en tu comuna</LogoLink>
    <FAQButton />
  </Container>
);

export default Logo;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 1em 0;
  padding: 20px;
  width: 95%;
  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
  }

  ${({ theme }) => theme.baseShadow}
  background-color: ${({ theme }) => theme.colors.red.normal};
  border-radius: 10px;
  text-align: center;
`;

const LogoLink = styled(Link)`
  color: white;
  font-weight: 400;
  font-size: 1.1em;
  @media ${({ theme }) => theme.device.mobileL} {
    font-size: 1.45em;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 2em;
  }
`;
