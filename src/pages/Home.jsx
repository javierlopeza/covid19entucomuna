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
import { formatDateForHumans, formatValue } from '../utils/formatter';
import MetricsCards from '../components/MetricsCards';
import metricsIcons from '../assets/images/metrics';
import BoxTitle from '../components/BoxTitle';
import Breadcrumb from '../components/Breadcrumb';
import LoaderSpinner from '../components/LoaderSpinner';
import handlePageChange from '../utils/pageChangeHandler';
import { isDataFromToday } from '../utils/checkData';
import notify from '../clients/notifier';
import MetricCardTooltip from '../components/MetricCardTooltip';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, chileData: {} };
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
    const { loading } = this.state;
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
      recuperados,
      fallecidos,
      series,
    } = chileData;
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
          <MetricsCards.Container>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.population} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Población</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatValue(poblacion)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
              <MetricCardTooltip>
                Proyección de población del año 2020 en base al CENSO 2017 (INE).
              </MetricCardTooltip>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.active} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Activos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatValue(activos.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
              <MetricCardTooltip>
                {`Reporte Diario MINSAL (${formatDateForHumans(activos.date)})`}
              </MetricCardTooltip>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.recovered} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Recuperados</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatValue(recuperados.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
              <MetricCardTooltip>
                {`Reporte Diario MINSAL (${formatDateForHumans(recuperados.date)})`}
              </MetricCardTooltip>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.deaths} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Fallecidos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatValue(fallecidos.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
              <MetricCardTooltip>
                {`Reporte Diario MINSAL (${formatDateForHumans(fallecidos.date)})`}
              </MetricCardTooltip>
            </MetricsCards.Card>
          </MetricsCards.Container>
          {/* Chart */}
          <ChartContainer>
            <BoxTitle>
              Casos Activos
            </BoxTitle>
            <CVLineChart data={series.activos} />
          </ChartContainer>
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
