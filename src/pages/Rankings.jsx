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
import NavBubbleButton from '../components/NavBubbleButton';

const rankingParameters = {
  'mas-casos-activos': ['activos.value', { activos: 'Casos activos' }],
  'mayores-tasas-de-activos': ['tasaActivos.value', { tasaActivos: 'Casos activos c/ 100 mil' }],
  'mayores-cambios-en-casos-activos': ['delta.activos.value', { deltaActivos: 'Cambio en casos activos' }],
  'mayores-cambios-en-tasa-de-activos': ['delta.tasaActivos.value', { deltaTasaActivos: 'Cambio en casos activos c/ 100 mil' }],
};

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
    const { match: { params: { rankingName } } } = this.props;
    let {
      location: { chileData },
    } = this.props;
    if (!chileData || !isDataFromToday(chileData)) {
      chileData = await getChileData();
    }
    this.setState({ loading: false, chileData });
    this.buildCommunesList();
    this.getRanking(...rankingParameters[rankingName]);
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
          <NavBubbleButton
            path="/rankings/mas-casos-activos"
            onClick={() => this.getRanking(...rankingParameters['mas-casos-activos'])}
          >
            Comunas con más casos activos
          </NavBubbleButton>
          <NavBubbleButton
            path="/rankings/mayores-tasas-de-activos"
            onClick={() => this.getRanking(...rankingParameters['mayores-tasas-de-activos'])}
          >
            Comunas con más casos activos cada 100 mil habitantes
          </NavBubbleButton>
          <NavBubbleButton
            path="/rankings/mayores-cambios-en-casos-activos"
            onClick={() => this.getRanking(...rankingParameters['mayores-cambios-en-casos-activos'])}
          >
            Delta activos absolutos
          </NavBubbleButton>
          <NavBubbleButton
            path="/rankings/mayores-cambios-en-tasa-de-activos"
            onClick={() => this.getRanking(...rankingParameters['mayores-cambios-en-tasa-de-activos'])}
          >
            Delta activos cada 100 mil habitantes
          </NavBubbleButton>
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
