import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import mincienciaFetcher from '../clients/minciencia-fetcher';

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
          { totalesNacionales.length && (
          <LineChart
            width={1000}
            height={600}
            data={totalesNacionales}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Casos activos" stroke="#8884d8" activeDot={{ r: 8 }} isAnimationActive />
          </LineChart>
          )}
        </div>
        {regiones}
      </div>
    );
  }
}

export default Home;
