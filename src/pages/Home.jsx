import React, { Component } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import styled, { css } from 'styled-components';
import mincienciaFetcher from '../clients/minciencia-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import PageTitle from '../components/PageTitle';
import PlacesContainer from '../components/PlacesContainer';
import PlaceLink from '../components/PlaceLink';
import scrollToTop from '../utils/scrollToTop';
import formatter from '../utils/formatter';
import poblacion from '../assets/images/poblacion.png';
import activos from '../assets/images/activos.png';
import recuperados from '../assets/images/recuperados.png';
import fallecidos from '../assets/images/fallecidos.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPorComuna: {}, totalesNacionales: [], lastData: null };
  }

  async componentDidMount() {
    scrollToTop();
    const dataPorComuna = await mincienciaFetcher.getAllDataPorComuna();
    const totalesNacionales = await mincienciaFetcher.getTotalesNacionales();
    const lastData = totalesNacionales.slice(-1)[0];
    this.setState({ dataPorComuna, totalesNacionales, lastData });
  }

  render() {
    const { dataPorComuna, totalesNacionales, lastData } = this.state;
    const regiones = _.keys(dataPorComuna).map((region) => {
      const to = {
        pathname: `/regiones/${region}`,
        dataPorComuna,
      };
      return (
        <PlaceLink key={region} to={to}>
          {region}
        </PlaceLink>
      );
    });
    const indexMetropolitana = _.findIndex(regiones, ['key', 'Metropolitana']);
    const metropolitana = regiones.splice(indexMetropolitana, 1);
    regiones.unshift(metropolitana);
    return (
      <>
        {
          !!lastData && (
          <Helmet>
            <title>COVID-19 en tu comuna</title>
            <meta name="description" content={`En Chile se registran ${formatter.valueFormatter(lastData['Casos activos'])} casos activos al ${formatter.dateFormatter(lastData.date)}.`} />
          </Helmet>
          )
        }
        <CenteredContainer>
          {
            !!lastData && (
              <MetricCards>
                <MetricCardContainer>
                  <MetricCardImage src={poblacion} />
                  <MetricCardTextContainer>
                    <MetricCardLabel>Población</MetricCardLabel>
                    <MetricCardValue>19.458.310</MetricCardValue>
                  </MetricCardTextContainer>
                </MetricCardContainer>
                <MetricCardContainer>
                  <MetricCardImage src={activos} />
                  <MetricCardTextContainer>
                    <MetricCardLabel>Activos</MetricCardLabel>
                    <MetricCardValue>{formatter.valueFormatter(lastData['Casos activos'])}</MetricCardValue>
                  </MetricCardTextContainer>
                </MetricCardContainer>
                <MetricCardContainer>
                  <MetricCardImage src={recuperados} />
                  <MetricCardTextContainer>
                    <MetricCardLabel>Recuperados</MetricCardLabel>
                    <MetricCardValue>{formatter.valueFormatter(lastData['Casos recuperados'])}</MetricCardValue>
                  </MetricCardTextContainer>
                </MetricCardContainer>
                <MetricCardContainer>
                  <MetricCardImage src={fallecidos} />
                  <MetricCardTextContainer>
                    <MetricCardLabel>Fallecidos</MetricCardLabel>
                    <MetricCardValue>{formatter.valueFormatter(lastData.Fallecidos)}</MetricCardValue>
                  </MetricCardTextContainer>
                </MetricCardContainer>
              </MetricCards>
            )
          }
          <ChartContainer>
            <PageTitle>
            Chile
            </PageTitle>
            { !!totalesNacionales.length && <CVLineChart data={totalesNacionales} />}
          </ChartContainer>
          <PlacesContainer totalPlaces={regiones.length}>
            {regiones}
          </PlacesContainer>
        </CenteredContainer>
      </>
    );
  }
}

export default Home;

const MetricCards = styled.div`
  width: 95%;
  margin-bottom: 1em;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 0.5em 0;

  ${({ theme: { device } }) => css`
    @media ${device.mobileM} {
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5em 0.5em;
    }
    @media ${device.tablet} {
      width: 95%;
      grid-template-rows: none;
      grid-template-columns: repeat(4, 1fr);
      gap: 0 1em;
    }
    @media ${device.laptop} {
      width: 75%;
    }
  `}
`;

const MetricCardContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  ${({ theme }) => css`
    ${theme.baseShadow}
  `}
  height: 40px;

  padding: 10px 20px;
  font-size: 0.75em;
  ${({ theme: { device } }) => css`
    @media ${device.mobileM} {
      padding: 20px;
    }
    @media ${device.mobileL} {
      font-size: 0.9em;

    }
  `}
`;

const MetricCardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: inherit;
`;

const MetricCardImage = styled.img`
  height: 75%;
  margin-right: 1em;
`;

const MetricCardLabel = styled.p`
  margin: 0;
  margin-bottom: 5px;
  font-weight: 200;
  font-size: inherit;
`;

const MetricCardValue = styled.p`
  margin: 0;
  font-size: inherit;
`;
