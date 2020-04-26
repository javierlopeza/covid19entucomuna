import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <Container>
    <Credit>
      Fuente:
      {' '}
      <CreditLink href="http://www.minciencia.gob.cl/covid19" target="_blank">Ministerio de Salud</CreditLink>
    </Credit>
    <br />
    <Credit>
      Desarrollado por
      {' '}
      <CreditLink href="https://github.com/javierlopeza" target="_blank">Javier López</CreditLink>
    </Credit>
    <Credit>Diseñado por Antonia Daher</Credit>
  </Container>
);

export default Footer;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  height: 6em;
  padding: 1.5em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Credit = styled.span`
  font-size: 0.65em;
  line-height: 1.25em;
`;

const CreditLink = styled.a`
  color: inherit;
  font-size: inherit;

  :hover {
    font-weight: 200;
  }
`;
