import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import getChileData from '../clients/chile-data-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import PlacesContainer from '../components/PlacesContainer';
import PlaceLink from '../components/PlaceLink';
import scrollToTop from '../utils/scrollToTop';
import { formatDateForHumans, formatValue } from '../utils/formatter';
import MetricsCards from '../components/MetricsCards';
import MetricCard from '../components/MetricCard';
import metricsIcons from '../assets/images/metrics';
import BoxTitle from '../components/BoxTitle';
import Breadcrumb from '../components/Breadcrumb';
import LoaderSpinner from '../components/LoaderSpinner';
import handlePageChange from '../utils/pageChangeHandler';
import { isDataFromToday } from '../utils/checkData';
import notify from '../clients/notifier';
import theme from '../styles/theme';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, chileData: {}, selectedData: 'activos' };
  }

  async componentDidMount() {
    scrollToTop();
    let { location: { chileData } } = this.props;
    if (!chileData || !isDataFromToday(chileData)) {
      chileData = await getChileData();
    }
    await notify();
    this.setState({ loading: false, chileData });
  }

  render() {
    const { loading, selectedData } = this.state;
    if (loading) {
      return <LoaderSpinner />;
    }
    const { chileData } = this.state;
    const regionsButtons = _.keys(chileData.regiones).map((region) => {
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
    const indexMetropolitana = _.findIndex(regionsButtons, ['key', 'Metropolitana']);
    const metropolitana = regionsButtons.splice(indexMetropolitana, 1);
    regionsButtons.unshift(metropolitana);
    const {
      poblacion,
      activos,
      confirmados,
      fallecidos,
      series,
    } = chileData;
    const cases = {
      fallecidos: {
        color: theme.colors.red.dark,
        data: series.fallecidos,
        title: 'Casos Fallecidos',
      },
      confirmados: {
        color: theme.colors.green.dark,
        data: series.confirmados,
        title: 'Casos Confirmados',
      },
      activos: {
        color: theme.colors.yellow.normal,
        data: series.activos,
        title: 'Casos Activos',
      },
    };
    return (
      <>
        <Helmet onChangeClientState={handlePageChange}>
          <title>COVID-19 en tu comuna</title>
          <meta name="description" content={`En Chile se registran ${formatValue(activos.value)} casos activos al ${formatDateForHumans(activos.date)}.`} />
        </Helmet>
        <CenteredContainer>
          {/* Navigation Breadcrumbs */}
          <Breadcrumb.Container>
            <Breadcrumb.Item to="/">
                Chile
            </Breadcrumb.Item>
          </Breadcrumb.Container>
          {/* Metrics */}
          <MetricsCards.Container id="metricsContainer">
            <MetricCard
              icon={metricsIcons.population}
              label="Población"
              value={poblacion}
              tooltip="Proyección de población del año 2020 en base al CENSO 2017 (INE)"
            />
            <MetricCard
              icon={metricsIcons.confirmed}
              label="Confirmados"
              value={confirmados.value}
              tooltip={`Reporte Diario MINSAL (${formatDateForHumans(confirmados.date)})`}
              onClick={() => this.setState({ selectedData: 'confirmados' })}
            />
            <MetricCard
              icon={metricsIcons.active}
              label="Activos"
              value={activos.value}
              tooltip={`Reporte Diario MINSAL (${formatDateForHumans(activos.date)})`}
              onClick={() => this.setState({ selectedData: 'activos' })}
            />
            <MetricCard
              icon={metricsIcons.deaths}
              label="Fallecidos"
              value={fallecidos.value}
              tooltip={`Reporte Diario MINSAL (${formatDateForHumans(fallecidos.date)})`}
              onClick={() => this.setState({ selectedData: 'fallecidos' })}
            />
          </MetricsCards.Container>
          {/* Chart */}
          <ChartContainer>
            <BoxTitle color={cases[selectedData].color}>{cases[selectedData].title}</BoxTitle>
            <CVLineChart
              data={cases[selectedData].data}
              color={cases[selectedData].color}
              title={cases[selectedData].title}
            />
          </ChartContainer>
          {/* Rankings Link */}
          <RankingsButton to="/rankings">
            Revisa las comunas más afectadas
          </RankingsButton>
          {/* Regions */}
          <PlacesContainer totalPlaces={regionsButtons.length}>
            {regionsButtons}
          </PlacesContainer>
        </CenteredContainer>
      </>
    );
  }
}

export default Home;

const RankingsButton = styled(Link)`
  font-size: 0.85em;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.blue.normal};
  color: white;
  ${({ theme }) => theme.baseShadow}
  border-radius: 10px;
  padding: 0.5em 0.75em;
  margin-bottom: 1em;

  @media ${({ theme }) => theme.device.mobileM} {
    font-size: 1em;
  }
`;
