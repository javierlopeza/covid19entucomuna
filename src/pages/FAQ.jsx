import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import handlePageChange from '../utils/pageChangeHandler';

const FAQ = () => (
  <>
    <Helmet onChangeClientState={handlePageChange}>
      <title>COVID-19 en tu comuna - Preguntas Frecuentes</title>
      <meta
        name="description"
        content="Análisis simple y amigable de los casos activos de coronavirus por región y por comuna en Chile."
      />
    </Helmet>
    <MainContainer>
      <Title>Preguntas Frecuentes</Title>
      <Container>
        <Question>¿De dónde se obtienen los datos?</Question>
        <Answer>
          El Ministerio de Salud publica 2 documentos. El Reporte Diario, que
          informa la situación a nivel nacional y el Informe Epidemiológico,
          publicado 2 veces por semana, que informa la situación a nivel
          comunal. Estos documentos oficiales los puedes encontrar&nbsp;
          <ExternalLink
            href="https://www.gob.cl/coronavirus/cifrasoficiales/"
            target="_blank"
          >
            aquí
          </ExternalLink>
          .
        </Answer>
      </Container>
      <Container>
        <Question>¿Cada cúanto se actualizan los casos por comuna?</Question>
        <Answer>
          El Informe Epidemiológico se publica 2 veces por semana, lunes y
          viernes generalmente, por lo que los casos activos por comuna se están
          actualizando cada 3-4 días aproximadamente. A medida que el Ministerio
          de Salud aumente la frecuencia de publicación de estos informes, los
          datos en la página también se verán actualizados.
        </Answer>
      </Container>
      <Container>
        <Question>¿Cómo se contabilizan los casos activos?</Question>
        <Answer>
          El Reporte Diario y el Informe Epidemiológico definen los casos
          activos como:
          <Quote>
            &nbsp;&quot;personas vivas confirmadas con COVID-19 cuya fecha de
            inicio de síntomas en la notificación es menor o igual a 14 días a
            la fecha del reporte actual&quot;.
          </Quote>
        </Answer>
      </Container>
      <Container>
        <Question>
          ¿Por qué el 2 de junio cambiaron retroactivamente los casos activos a
          nivel nacional?
        </Question>
        <Answer>
          Previo al 2 de junio, los casos activos a nivel nacional publicados en
          el Reporte Diario eran contabilizados usando la fecha de notificación
          del examen PCR. Desde el 2 de junio, el Reporte Diario cambió la
          metodología de conteo de casos activos por la misma que utiliza el
          Informe Epidemiológico, es decir, la fecha de inicio de síntomas.
        </Answer>
        <Answer>
          El 2 de junio, calculamos retroactivamente los casos activos a nivel
          nacional utilizando los Informes Epidemiológicos publicados en las
          semanas anteriores para ser consistentes en la información
          visualizada. De esta manera, toda cifra de casos activos que
          presentamos en esta página, es calculada utilizando la fecha de inicio
          de síntomas.
        </Answer>
        <Answer>
          El mayor efecto de este cambio es que la información a nivel nacional,
          entregada diariamente por el Ministerio de Salud, será más precisa,
          por usar la fecha de inicio de síntomas para calcular el período en
          que una persona infectada puede contagiar.
        </Answer>
      </Container>
    </MainContainer>
  </>
);

export default FAQ;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-weight: 400;
  color: white;

  margin: 0.5em 0;
  background-color: ${({ theme }) => theme.colors.blue.normal};
  ${({ theme }) => theme.baseShadow}
  padding: 0.75em 1em;
  border-radius: 0.5em;

  font-size: 1.1em;
  @media ${({ theme }) => theme.device.mobileL} {
    font-size: 1.2em;
  }
  @media ${({ theme }) => theme.device.laptop} {
    font-size: 1.25em;
  }
`;

const Container = styled.div`
  background-color: white;
  box-sizing: border-box;
  width: 95%;
  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
  }
  padding: 1.75em 1.5em;
  border-radius: 0.5em;
  ${({ theme }) => theme.baseShadow}

  :not(:first-child) {
    margin-top: 1em;
  }
`;

const Question = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.blue.normal};
  font-weight: 400;
  line-height: 1em;
  margin-bottom: 1em;
`;

const Answer = styled.p`
  margin: 0;
  font-size: 0.85em;
  line-height: 1.25em;
`;

const ExternalLink = styled.a`
  font-size: 1em;
  word-wrap: break-word;
  color: ${({ theme }) => theme.colors.blue.normal};

  :hover {
    text-decoration: underline;
  }
`;

const Quote = styled.span`
  font-size: 1em;
  font-style: italic;
`;
