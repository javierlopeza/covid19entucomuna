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
import { formatDate, formatValue } from '../utils/formatter';
import MetricsCards from '../components/MetricsCards';
import metricsIcons from '../assets/images/metrics';
import Breadcrumb from '../components/Breadcrumb';
import LoaderSpinner from '../components/LoaderSpinner';
import getChileData from '../clients/chile-data-fetcher';
import handlePageChange from '../utils/pageChangeHandler';

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
    if (!chileData) {
      chileData = await getChileData();
    }
    if (_.keys(chileData.regiones).includes(region)) {
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
          <meta name="description" content={`En la ${completeName} se registran ${formatValue(activos.value)} casos activos al ${formatDate(activos.date)}.`} />
        </Helmet>
        <CenteredContainer>
          {/* Navigation Breadcrumbs */}
          <Breadcrumb.Container>
            <Breadcrumb.Item to="/">
                Chile
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item to={`/regiones/${region}`}>
              {completeName}
            </Breadcrumb.Item>
          </Breadcrumb.Container>
          {/* Metrics */}
          <MetricsCards.Container>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.poblacion} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Población</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatValue(poblacion)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.activos} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Activos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatValue(activos.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.recuperados} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Recuperados</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatValue(recuperados.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.fallecidos} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Fallecidos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatValue(fallecidos.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
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
