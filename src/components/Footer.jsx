import React from 'react';
import styled from 'styled-components';
import GitHubMark from '../assets/images/github.svg';
import LinkedIn from '../assets/images/linkedin.svg';
import CreditLink from './CreditLink';

const Footer = () => (
  <Container>
    <Credit>
      Fuente:
      {' '}
      <CreditLink href="https://www.gob.cl/coronavirus/cifrasoficiales/">
        Cifras Oficiales, Gobierno de Chile
      </CreditLink>
    </Credit>
    <br />
    <CreditWithIcon>
      <CreditIcon src={GitHubMark} alt="GitHub" />
      <Credit>
        <CreditLink href="https://github.com/javierlopeza/covid19entucomuna/">
          javierlopeza/covid19entucomuna
        </CreditLink>
      </Credit>
    </CreditWithIcon>
    <CreditWithIcon>
      <CreditIcon src={LinkedIn} alt="LinkedIn" />
      <Credit style={{ position: 'relative', top: '1px' }}>
        <CreditLink href="https://cl.linkedin.com/in/antonia-daher-5a416a192">
          Antonia Daher
        </CreditLink>
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
  height: 6em;
  padding-top: 1em;
  padding-bottom: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const CreditWithIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

const Credit = styled.span`
  font-size: 0.65em;
`;

const CreditIcon = styled.img`
  height: 0.65em;
  margin-right: 5px;
`;
