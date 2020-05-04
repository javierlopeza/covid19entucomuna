import React, { Component } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import ChartTitle from '../components/ChartTitle';
import PlacesContainer from '../components/PlacesContainer';
import PlaceLink from '../components/PlaceLink';
import scrollToTop from '../utils/scrollToTop';
import formatter from '../utils/formatter';
import MetricsCards from '../components/MetricsCards';
import metricsIcons from '../assets/images/metrics';
import Breadcrumb from '../components/Breadcrumb';
import LoaderSpinner from '../components/LoaderSpinner';
import getChileData from '../clients/chile-data-fetcher';

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
    const comunas = _.keys(chileData.regiones[region].comunas).map((comuna) => {
      const to = {
        pathname: `/regiones/${region}/comunas/${comuna}`,
        chileData,
      };
      return <PlaceLink key={comuna} to={to}>{comuna}</PlaceLink>;
    });
    return (
      <>
        <Helmet>
          <title>{`COVID-19 en tu comuna - Región ${region}`}</title>
          <meta name="description" content={`En la Región ${region} se registran ${formatter.valueFormatter(chileData.regiones[region].activos.value)} casos activos al ${formatter.dateFormatter(chileData.regiones[region].activos.date)}.`} />
        </Helmet>
        <CenteredContainer>
          {/* Navigation Breadcrumbs */}
          <Breadcrumb.Container>
            <Breadcrumb.Item to="/">
                Chile
            </Breadcrumb.Item>
            <Breadcrumb.Item to={`/regiones/${region}`}>
              {`Región ${region}`}
            </Breadcrumb.Item>
          </Breadcrumb.Container>
          {/* Metrics */}
          <MetricsCards.Container>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.poblacion} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Población</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(chileData.regiones[region].poblacion)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.activos} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Activos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(chileData.regiones[region].activos.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.recuperados} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Recuperados</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(chileData.regiones[region].recuperados.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.fallecidos} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Fallecidos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(chileData.regiones[region].fallecidos.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
          </MetricsCards.Container>
          {/* Chart */}
          <ChartContainer>
            <ChartTitle>
              Casos Activos
            </ChartTitle>
            <CVLineChart data={chileData.regiones[region].series.activos} />
          </ChartContainer>
          {/* Comunas */}
          <PlacesContainer totalPlaces={comunas.length}>
            {comunas}
          </PlacesContainer>
        </CenteredContainer>
      </>
    );
  }
}

export default Region;
