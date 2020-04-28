import React from 'react';
import styled from 'styled-components';
import GitHubMark from '../assets/images/github.svg';

const Footer = () => (
  <Container>
    <Credit>
      Fuente:
      {' '}
      <CreditLink href="http://www.minciencia.gob.cl/covid19" target="_blank">Ministerio de Salud</CreditLink>
    </Credit>
    <br />
    <CreditWithIcon>
      <CreditIcon src={GitHubMark} alt="GitHub" />
      <Credit>
        <CreditLink href="https://github.com/javierlopeza/coronavirus-chile" target="_blank">javierlopeza/coronavirus-chile</CreditLink>
      </Credit>
    </CreditWithIcon>
  </Container>
);

export default Footer;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: 5em;
  padding: 1.5em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreditWithIcon = styled.div`
  display: flex;
`;

const Credit = styled.span`
  font-size: 0.65em;
`;

const CreditIcon = styled.img`
  height: 0.65em;
  margin-right: 5px;
`;

const CreditLink = styled.a`
  color: inherit;
  font-size: inherit;

  :hover {
    font-weight: 200;
  }
`;
