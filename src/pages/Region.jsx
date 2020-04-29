import React, { Component } from 'react';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import mincienciaFetcher from '../clients/minciencia-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import ChartTitle from '../components/ChartTitle';
import PlacesContainer from '../components/PlacesContainer';
import PlaceLink from '../components/PlaceLink';
import scrollToTop from '../utils/scrollToTop';
import fixComunaName from '../utils/fixComunaName';
import formatter from '../utils/formatter';
import MetricsCards from '../components/MetricsCards';
import metricsIcons from '../assets/images/metrics';
import { Loader } from '../components/Loader';

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      dataRegion: {},
      dataComunasRegion: {},
      totalesRegionales: [],
      lastData: null,
      loading: true,
    };
  }

  async componentDidMount() {
    scrollToTop();
    const { match: { params: { region } } } = this.props;
    let { location: { dataPorComuna } } = this.props;
    if (!dataPorComuna) {
      dataPorComuna = await mincienciaFetcher.getAllDataPorComuna();
    }
    try {
      const dataRegion = dataPorComuna[region];
      const dataComunasRegion = dataRegion.comunas;
      const totalesRegionales = dataRegion.totales;
      const lastData = totalesRegionales.slice(-1)[0];
      this.setState({
        region, dataRegion, dataComunasRegion, totalesRegionales, lastData, loading: false,
      });
    } catch (err) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    }
    const {
      region, dataRegion, dataComunasRegion, totalesRegionales, lastData,
    } = this.state;
    const comunas = _.keys(dataComunasRegion).map((comuna) => {
      const to = {
        pathname: `/regiones/${region}/comunas/${comuna}`,
        dataComunasRegion,
      };
      return <PlaceLink key={comuna} to={to}>{fixComunaName(comuna)}</PlaceLink>;
    });
    return (
      <>
        <Helmet>
          <title>{`COVID-19 en tu comuna - Región ${region}`}</title>
          <meta name="description" content={`En la Región ${region} se registran ${formatter.valueFormatter(lastData['Casos activos'])} casos activos al ${formatter.dateFormatter(lastData.date)}.`} />
        </Helmet>
        <CenteredContainer>
          {/* Metrics */}
          <MetricsCards.Container>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.poblacion} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Población</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(dataRegion.poblacion)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.activos} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Activos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(lastData['Casos activos'])}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.recuperados} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Recuperados</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(dataRegion.confirmados.value - dataRegion.fallecidos.value - lastData['Casos activos'])}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
            <MetricsCards.Card>
              <MetricsCards.Icon src={metricsIcons.fallecidos} />
              <MetricsCards.TextContainer>
                <MetricsCards.Label>Fallecidos</MetricsCards.Label>
                <MetricsCards.Value>
                  {formatter.valueFormatter(dataRegion.fallecidos.value)}
                </MetricsCards.Value>
              </MetricsCards.TextContainer>
            </MetricsCards.Card>
          </MetricsCards.Container>
          {/* Chart */}
          <ChartContainer>
            <ChartTitle>
              {`Región ${region}`}
            </ChartTitle>
            <CVLineChart data={totalesRegionales} />
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
