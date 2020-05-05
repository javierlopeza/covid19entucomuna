import React from 'react';
import styled, { css } from 'styled-components';
import GitHubMark from '../assets/images/github.svg';
import LinkedIn from '../assets/images/linkedin.svg';
import CreditLink from './CreditLink';

const Footer = () => (
  <Container>
    <LongCredit>
      Los casos activos por región y por comuna son actualizados automáticamente a medida
      que son publicados en los Informes Epidemiológicos del MINSAL (cada 3-4 días).
    </LongCredit>
    <Credit>
      Fuente:
      {' '}
      <CreditLink href="http://www.minciencia.gob.cl/covid19">
        Mesa de Datos COVID-19
      </CreditLink>
    </Credit>
    <br />
    <CreditWithIcon>
      <CreditIcon src={GitHubMark} alt="GitHub" />
      <Credit>
        <CreditLink href="https://github.com/javierlopeza/coronavirus-chile">
          javierlopeza/coronavirus-chile
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
  height: 9.5em;
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

const LongCredit = styled.p`
  font-style: italic;
  font-size: 0.65em;
  text-align: center;
  width: 80%;

  ${({ theme: { device } }) => css`
    @media ${device.mobileM} {
      width: 75%;
    }
    @media ${device.mobileL} {
      width: 65%;
    }
    @media ${device.laptop} {
      width: 30%;
    }
  `}
`;

const CreditIcon = styled.img`
  height: 0.65em;
  margin-right: 5px;
`;
