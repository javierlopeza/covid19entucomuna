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
import rank from '../utils/ranking';
import CenteredContainer from '../components/CenteredContainer';

class Rankings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      chileData: {},
      communes: [],
      selectedCommunes: [],
      baseColumns: {
        comuna: 'Comuna',
        poblacion: 'Población',
      },
      extraColumns: {},
    };
  }

  async componentDidMount() {
    scrollToTop();
    let {
      location: { chileData },
    } = this.props;
    if (!chileData || !isDataFromToday(chileData)) {
      chileData = await getChileData();
    }
    this.setState({ loading: false, chileData });
    this.buildCommunesList();
    await notify();
  }

  buildCommunesList() {
    const { chileData } = this.state;
    const communesNestedObjects = _.map(chileData.regiones, ({ comunas }) => comunas);
    const communesNested = communesNestedObjects.map(_.values);
    const communes = _.flatten(communesNested);
    this.setState({ communes });
  }

  getRanking(sortKeyPath, extraColumns) {
    const { communes } = this.state;
    const selectedCommunes = rank(communes, sortKeyPath);
    this.setState({ selectedCommunes, extraColumns });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoaderSpinner />;
    }
    const { selectedCommunes, baseColumns, extraColumns } = this.state;
    const columns = { ...baseColumns, ...extraColumns };
    const completeRows = selectedCommunes.map(
      ({
        name: comuna, region, poblacion, activos, tasaActivos, delta,
      }) => ({
        data: {
          comuna,
          poblacion,
          activos: activos.value,
          tasaActivos: Math.floor(tasaActivos.value),
          deltaActivos: delta.activos.value,
          deltaTasaActivos: Math.floor(delta.tasaActivos.value),
        },
        path: `/regiones/${region}/comunas/${comuna}`,
      }),
    );
    const rows = completeRows.map(row => ({
      ...row,
      data: _.pick(row.data, _.keys(columns)),
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
        <CenteredContainer>
          <button onClick={() => this.getRanking('activos.value', { activos: 'Casos activos' })}>
          Comunas con más casos activos
          </button>
          <button onClick={() => this.getRanking('tasaActivos.value', { tasaActivos: 'Casos activos c/ 100 mil' })}>
          Comunas con más casos activos cada 100 mil habitantes
          </button>
          <button onClick={() => this.getRanking('delta.activos.value', { deltaActivos: 'Cambio en casos activos' })}>
          Delta activos absolutos
          </button>
          <button onClick={() => this.getRanking('delta.tasaActivos.value', { deltaTasaActivos: 'Cambio en casos activos c/ 100 mil' })}>
          Delta activos cada 100 mil habitantes
          </button>

          <TableContainer>
            <Table headers={_.values(columns)} rows={rows} />
          </TableContainer>
        </CenteredContainer>
      </>
    );
  }
}

export default Rankings;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
`;
