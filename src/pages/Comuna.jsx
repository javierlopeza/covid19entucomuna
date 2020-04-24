import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import mincienciaFetcher from '../clients/minciencia-fetcher';

class Comuna extends Component {
  constructor(props) {
    super(props);
    this.state = { region: null, comuna: null, dataComuna: {} };
  }

  async componentDidMount() {
    const { match: { params: { region, comuna } } } = this.props;
    let { location: { dataComunasRegion } } = this.props;
    if (!dataComunasRegion) {
      const dataPorComuna = await mincienciaFetcher.getAllDataPorComuna();
      dataComunasRegion = dataPorComuna[region].comunas;
    }
    try {
      const dataComuna = dataComunasRegion[comuna];
      this.setState({ region, comuna, dataComuna });
    } catch (err) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { history } = this.props;
    const { region, comuna, dataComuna } = this.state;
    return (
      <div>
        <button onClick={() => history.goBack()}>Go Back</button>
        {JSON.stringify(dataComuna)}
      </div>
    );
  }
}

export default Comuna;
