import React, { Component } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import getChileData from '../clients/chile-data-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import PlacesContainer from '../components/PlacesContainer';
import PlaceLink from '../components/PlaceLink';
import scrollToTop from '../utils/scrollToTop';
import formatter from '../utils/formatter';
import MetricsCards from '../components/MetricsCards';
import metricsIcons from '../assets/images/metrics';
import ChartTitle from '../components/ChartTitle';
import Breadcrumb from '../components/Breadcrumb';
import LoaderSpinner from '../components/LoaderSpinner';
import handlePageChange from '../utils/pageChangeHandler';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, chileData: {} };
  }

  async componentDidMount() {
    scrollToTop();
    const chileData = await getChileData();
    this.setState({ loading: false, chileData });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoaderSpinner />;
    }
    const { chileData } = this.state;
    const regiones = _.keys(chileData.regiones).map((region) => {
      const to = {
        pathname: `/regiones/${region}`,
        chileData,
      };
      return (
        <PlaceLink.Button key={region} to={to}>
          {region}
        </PlaceLink.Button>
      );
    });
    const indexMetropolitana = _.findIndex(regiones, ['key', 'Metropolitana']);
    const metropolitana = regiones.splice(indexMetropolitana, 1);
    regiones.unshift(metropolitana);
    return (
      <>
        <Helmet onChangeClientState={handlePageChange}>
          <title>COVID-19 en tu comuna</title>
          <meta name="description" content={`En Chile se registran ${formatter.valueFormatter(chileData.activos.value)} casos activos al ${formatter.dateFormatter(chileData.activos.date)}.`} />
        </Helmet>
        <CenteredContainer>
          {/* Navigation Breadcrumbs */}
          <Breadcrumb.Container>
            <Breadcrumb.Item to="/">
                Chile
            </Breadcrumb.Item>
          </Breadcrumb.Container>
          {/* Metrics */}
          <MetricsCards.Container>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.poblacion} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Población</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(chileData.poblacion)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.activos} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Activos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(chileData.activos.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.recuperados} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Recuperados</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(chileData.recuperados.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.fallecidos} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Fallecidos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(chileData.fallecidos.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
          </MetricsCards.Container>
          {/* Chart */}
          <ChartContainer>
            <ChartTitle>
              Casos Activos
            </ChartTitle>
            <CVLineChart data={chileData.series.activos} />
          </ChartContainer>
          {/* Comunas */}
          <PlacesContainer totalPlaces={regiones.length}>
            {regiones}
          </PlacesContainer>
        </CenteredContainer>
      </>
    );
  }
}

export default Home;
