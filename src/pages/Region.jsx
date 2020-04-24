import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import mincienciaFetcher from '../clients/minciencia-fetcher';

class Region extends Component {
  constructor(props) {
    super(props);
    this.state = { region: null, dataComunasRegion: {} };
  }

  async componentDidMount() {
    const { match: { params: { region } } } = this.props;
    let { location: { dataPorComuna } } = this.props;
    if (!dataPorComuna) {
      dataPorComuna = await mincienciaFetcher.getAllDataPorComuna();
    }
    try {
      const dataComunasRegion = dataPorComuna[region].comunas;
      this.setState({ region, dataComunasRegion });
    } catch (err) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { history } = this.props;
    const { region, dataComunasRegion } = this.state;
    const comunas = _.keys(dataComunasRegion).map((comuna) => {
      const to = {
        pathname: `/regiones/${region}/comunas/${comuna}`,
        dataComunasRegion,
      };
      return <Link key={comuna} to={to}>{comuna}</Link>;
    });
    return (
      <div>
        <button onClick={() => history.goBack()}>Go Back</button>
        {comunas}
      </div>
    );
  }
}

export default Region;
