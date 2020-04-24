import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import mincienciaFetcher from '../clients/minciencia-fetcher';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { dataPorComuna: {} };
  }

  async componentDidMount() {
    const dataPorComuna = await mincienciaFetcher.getAllDataPorComuna();
    this.setState({ dataPorComuna });
  }

  render() {
    const { dataPorComuna } = this.state;
    const regiones = _.keys(dataPorComuna).map(region => <p key={region}>{region}</p>);
    return (
      <div>
        {regiones}
      </div>
    );
  }
}

export default Home;
