import React, { Component } from 'react';
import _ from 'lodash';
import mincienciaFetcher from '../clients/minciencia-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import PageTitle from '../components/PageTitle';
import PlacesContainer from '../components/PlacesContainer';
import PlaceLink from '../components/PlaceLink';
import scrollToTop from '../utils/scrollToTop';

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = { region: null, dataComunasRegion: {}, totalesRegionales: [] };
  }

  async componentDidMount() {
    scrollToTop();
    const { match: { params: { region } } } = this.props;
    let { location: { dataPorComuna } } = this.props;
    if (!dataPorComuna) {
      dataPorComuna = await mincienciaFetcher.getAllDataPorComuna();
    }
    try {
      const dataComunasRegion = dataPorComuna[region].comunas;
      const totalesRegionales = dataPorComuna[region].totales;
      this.setState({ region, dataComunasRegion, totalesRegionales });
    } catch (err) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { region, dataComunasRegion, totalesRegionales } = this.state;
    const comunas = _.keys(dataComunasRegion).map((comuna) => {
      const to = {
        pathname: `/regiones/${region}/comunas/${comuna}`,
        dataComunasRegion,
      };
      return <PlaceLink key={comuna} to={to}>{comuna}</PlaceLink>;
    });
    return (
      <CenteredContainer>
        <ChartContainer>
          <PageTitle>
            {region && `Región ${region}`}
          </PageTitle>
          { !!totalesRegionales.length && <CVLineChart data={totalesRegionales} />}
        </ChartContainer>
        <PlacesContainer totalPlaces={comunas.length}>
          {comunas}
        </PlacesContainer>
      </CenteredContainer>
    );
  }
}

export default Region;
