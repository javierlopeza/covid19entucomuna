import React, { Component } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Helmet } from 'react-helmet';
import handlePageChange from '../utils/pageChangeHandler';
import scrollToTop from '../utils/scrollToTop';
import notify from '../clients/notifier';
import { isDataFromToday } from '../utils/checkData';
import getChileData from '../clients/chile-data-fetcher';
import LoaderSpinner from '../components/LoaderSpinner';
import Table from '../components/Table';

class Rankings extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, chileData: {} };
  }

  async componentDidMount() {
    scrollToTop();
    let {
      location: { chileData },
    } = this.props;
    if (!chileData || !isDataFromToday(chileData)) {
      chileData = await getChileData();
    }
    await notify();
    this.setState({ loading: false, chileData });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoaderSpinner />;
    }
    const { chileData } = this.state;
    const comunasRM = chileData.regiones.Metropolitana.comunas;
    const rows = _.toPairs(comunasRM).map(([comuna, { poblacion, activos, tasaActivos }]) => ({
      data: [
        comuna,
        'Metropolitana',
        poblacion,
        activos.value,
        Math.floor(tasaActivos.value),
      ],
      path: `/regiones/Metropolitana/comunas/${comuna}`,
    }));
    return (
      <>
        <Helmet onChangeClientState={handlePageChange}>
          <title>COVID-19 en tu comuna - Preguntas Frecuentes</title>
          <meta
            name="description"
            content="Análisis simple y amigable de los casos activos de coronavirus por región y por comuna en Chile."
          />
        </Helmet>

        <TableContainer>
          <Table
            headers={['Comuna', 'Región', 'Población', 'Casos Activos', 'Tasa Activos']}
            rows={rows}
          />
        </TableContainer>
      </>
    );
  }
}

export default Rankings;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;
