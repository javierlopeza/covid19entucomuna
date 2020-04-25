import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import mincienciaFetcher from '../clients/minciencia-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import PageTitle from '../components/PageTitle';

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
        <Link key={region} to={to}>
          {region}
        </Link>
      );
    });
    return (
      <CenteredContainer>
        <PageTitle>
          Chile
        </PageTitle>
        <ChartContainer>
          { !!totalesNacionales.length && <CVLineChart data={totalesNacionales} />}
        </ChartContainer>
        <ItemsContainer>
          {regiones}
        </ItemsContainer>
      </CenteredContainer>
    );
  }
}

export default Home;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 30em) {
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }
`;
