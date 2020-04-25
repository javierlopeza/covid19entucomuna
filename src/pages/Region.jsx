import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import mincienciaFetcher from '../clients/minciencia-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import PageTitle from '../components/PageTitle';

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = { region: null, dataComunasRegion: {}, totalesRegionales: [] };
  }

  async componentDidMount() {
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
    const { history } = this.props;
    const { region, dataComunasRegion, totalesRegionales } = this.state;
    const comunas = _.keys(dataComunasRegion).map((comuna) => {
      const to = {
        pathname: `/regiones/${region}/comunas/${comuna}`,
        dataComunasRegion,
      };
      return <Link key={comuna} to={to}>{comuna}</Link>;
    });
    return (
      <CenteredContainer>
        <PageTitle>
          {region && `Región ${region}`}
        </PageTitle>
        <button onClick={() => history.goBack()}>Go Back</button>
        <ChartContainer>
          { !!totalesRegionales.length && <CVLineChart data={totalesRegionales} />}
        </ChartContainer>
        <ItemsContainer>
          {comunas}
        </ItemsContainer>
      </CenteredContainer>
    );
  }
}

export default Region;

const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 30em) {
    grid-template-rows: repeat(8, 1fr);
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }
`;
