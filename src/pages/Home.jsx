import React, { Component } from 'react';
import _ from 'lodash';
import mincienciaFetcher from '../clients/minciencia-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import PageTitle from '../components/PageTitle';
import PlacesContainer from '../components/PlacesContainer';
import PlaceLink from '../components/PlaceLink';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPorComuna: {}, totalesNacionales: [] };
  }

  async componentDidMount() {
    const dataPorComuna = await mincienciaFetcher.getAllDataPorComuna();
    const totalesNacionales = await mincienciaFetcher.getTotalesNacionales();
    this.setState({ dataPorComuna, totalesNacionales });
  }

  render() {
    const { dataPorComuna, totalesNacionales } = this.state;
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
    return (
      <CenteredContainer>
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
    );
  }
}

export default Home;
