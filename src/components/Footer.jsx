import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <Container>
    <Credit>Fuente: Ministerio de Salud</Credit>
    <br />
    <Credit>Desarrollado por Javier López</Credit>
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
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Credit = styled.span`
  font-size: 0.75em;
  line-height: 1.25em;
`;
