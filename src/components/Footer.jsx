import React from 'react';
import styled from 'styled-components';
import GitHubMark from '../assets/images/github.svg';
import LinkedIn from '../assets/images/linkedin.svg';

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
    <CreditWithIcon>
      <CreditIcon src={LinkedIn} alt="LinkedIn" />
      <Credit>
        <CreditLink href="https://cl.linkedin.com/in/antonia-daher-5a416a192" target="_blank">Antonia Daher</CreditLink>
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
  margin-bottom: 3px;
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
    text-decoration: underline;
  }
`;
