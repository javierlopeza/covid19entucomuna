import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import mincienciaFetcher from '../clients/minciencia-fetcher';
import CVLineChart from '../components/CVLineChart';

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
      <div>
        <div>
          { !!totalesNacionales.length && <CVLineChart data={totalesNacionales} />}
        </div>
        {regiones}
      </div>
    );
  }
}

export default Home;
