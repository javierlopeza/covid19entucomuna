import React, { Component } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import VisibilitySensor from 'react-visibility-sensor';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import BoxTitle from '../components/BoxTitle';
import PlacesContainer from '../components/PlacesContainer';
import PlaceLink from '../components/PlaceLink';
import QuarantineRibbon from '../components/QuarantineRibbon';
import scrollToTop from '../utils/scrollToTop';
import { formatDateForHumans, formatValue } from '../utils/formatter';
import MetricsCards from '../components/MetricsCards';
import MetricCard from '../components/MetricCard';
import metricsIcons from '../assets/images/metrics';
import Breadcrumb from '../components/Breadcrumb';
import LoaderSpinner from '../components/LoaderSpinner';
import getChileData from '../clients/chile-data-fetcher';
import handlePageChange from '../utils/pageChangeHandler';
import { isDataFromToday } from '../utils/checkData';
import notify from '../clients/notifier';

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      chileData: {},
      loading: true,
    };
  }

  async componentDidMount() {
    scrollToTop();
    const { match: { params: { region } } } = this.props;
    let { location: { chileData } } = this.props;
    if (!chileData || !isDataFromToday(chileData)) {
      chileData = await getChileData();
    }
    if (_.includes(_.keys(chileData.regiones), region)) {
      await notify();
      this.setState({ region, chileData, loading: false });
    } else {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoaderSpinner />;
    }
    const { region, chileData } = this.state;
    const { comunas } = chileData.regiones[region];
    const communesButtons = _.keys(comunas).map((commune) => {
      const to = {
        pathname: `/regiones/${region}/comunas/${commune}`,
        chileData,
      };
      return (
        <VisibilitySensor key={commune}>
          {({ isVisible }) => (
            <PlaceLink.Container>
              {comunas[commune].quarantine.isActive && (
                <QuarantineRibbon isVisible={isVisible} text="En cuarentena" />
              )}
              <PlaceLink.Button to={to}>
                {commune}
              </PlaceLink.Button>
            </PlaceLink.Container>
          )}
        </VisibilitySensor>
      );
    });
    const {
      completeName,
      poblacion,
      activos,
      recuperados,
      fallecidos,
      series,
    } = chileData.regiones[region];
    return (
      <>
        <Helmet onChangeClientState={handlePageChange}>
          <title>{`COVID-19 en tu comuna - ${completeName}`}</title>
          <meta name="description" content={`En la ${completeName} se registran ${formatValue(activos.value)} casos activos al ${formatDateForHumans(activos.date)}.`} />
        </Helmet>
        <CenteredContainer>
          {/* Navigation Breadcrumbs */}
          <Breadcrumb.Container>
            <Breadcrumb.Item to={{ pathname: '/', chileData }}>
                Chile
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item to={`/regiones/${region}`}>
              {completeName}
            </Breadcrumb.Item>
          </Breadcrumb.Container>
          {/* Metrics */}
          <MetricsCards.Container>
            <MetricCard
              icon={metricsIcons.population}
              label="Población"
              value={poblacion}
              tooltip="Proyección de población del año 2020 en base al CENSO 2017 (INE)."
            />
            <MetricCard
              icon={metricsIcons.active}
              label="Activos"
              value={activos.value}
              tooltip={`Informe Epidemilógico MINSAL (${formatDateForHumans(activos.date)})`}
            />
            <MetricCard
              icon={metricsIcons.recovered}
              label="Recuperados"
              value={recuperados.value}
              tooltip={`Informe Epidemilógico MINSAL (${formatDateForHumans(recuperados.date)})`}
            />
            <MetricCard
              icon={metricsIcons.deaths}
              label="Fallecidos"
              value={fallecidos.value}
              tooltip={`Reporte Diario MINSAL (${formatDateForHumans(fallecidos.date)})`}
            />
          </MetricsCards.Container>
          {/* Chart */}
          <ChartContainer>
            <BoxTitle>
              Casos Activos
            </BoxTitle>
            <CVLineChart data={series.activos} />
          </ChartContainer>
          {/* Comunas */}
          <PlacesContainer totalPlaces={communesButtons.length}>
            {communesButtons}
          </PlacesContainer>
        </CenteredContainer>
      </>
    );
  }
}

export default Region;
