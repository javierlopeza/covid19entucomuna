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
          actualizando cada 3-4 días aproximadamente. A medida que el
          Ministerio de Salud aumente la frecuencia de publicación de estos
          informes, los datos en la página también se verán actualizados.
        </Answer>
      </Container>
      <Container>
        <Question>¿Cómo se contabilizan los casos activos?</Question>
        <Answer>
          El Reporte Diario proyecta la recuperación en 14 días desde la fecha
          de notificación del examen PCR, es decir, contabiliza como activos los
          casos confirmados en los últimos 14 días.
        </Answer>
        <Answer>
          El Informe Epidemiológico define los casos activos como:
          <Quote>
            &nbsp;&quot;personas vivas confirmadas con COVID-19 cuya fecha de
            inicio de síntomas en la notificación es menor o igual a 14 días a
            la fecha del reporte actual&quot;.
          </Quote>
        </Answer>
      </Container>
      <Container>
        <Question>
          ¿Por qué hay inconsistencias entre los recuperados de Chile y la suma
          de los recuperados por región?
        </Question>
        <Answer>
          Los casos recuperados de Chile son obtenidos del Reporte Diario, que
          sobrestima los casos activos. Los casos recuperados por región y por
          comuna son obtenidos del Informe Epidemiológico. El Reporte Diario usa
          la fecha de notificación del examen PCR y el Informe EPI usa la fecha
          de inicio de síntomas. Esto produce diferencias entre los casos
          recuperados (y activos) a nivel nacional y regional, sin embargo, las
          cifras a nivel nacional publicadas diariamente son sobrestimaciones
          correctas de los casos activos que permiten una gestión eficaz de la
          Autoridad Sanitaria. Por el momento, en la página se muestran las
          cifras a nivel país obtenidas desde el Reporte Diario dado que son
          actualizadas diariamente. Si el MINSAL comienza a publicar los
          Informes EPI con mayor frecuencia, procederemos a usar dichos informes
          para mostrar las cifras a nivel país.
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
