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
import { formatDateForHumans } from '../utils/formatter';


const rankingParameters = {
  'mas-casos-activos': ['activos.value', { activos: 'Casos activos' }],
  'mayores-tasas-de-activos': ['tasaActivos.value', { tasaActivos: 'Tasa activos' }],
  'mayores-aumentos-en-casos-activos': ['delta.activos.value', { deltaActivos: '↑ Casos activos' }],
  'mayores-aumentos-en-tasa-de-activos': ['delta.tasaActivos.value', { deltaTasaActivos: '↑ Tasa activos' }],
};

class Rankings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      chileData: {},
      communes: [],
      fromDate: null,
      toDate: null,
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
    this.getDates();
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

  getDates() {
    const { communes } = this.state;
    const { delta: { activos: { fromDate, toDate } } } = _.head(communes);
    this.setState({ fromDate, toDate });
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
    const {
      selectedCommunes,
      baseColumns, extraColumns,
      fromDate, toDate,
    } = this.state;
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
    const footerChange = `Cálculo del ${formatDateForHumans(fromDate)} al ${formatDateForHumans(toDate)}`;
    const footerStock = `Datos al ${formatDateForHumans(toDate)}`;
    const footerText = _.some(_.keys(columns), k => _.includes(k, 'delta')) ? footerChange : footerStock;
    const { location: { pathname } } = document;
    return (
      <>
        <Helmet onChangeClientState={handlePageChange} currentPath={pathname}>
          <title>COVID-19 en tu comuna - Rankings</title>
          <meta
            name="description"
            content="Análisis simple y amigable de los casos activos de coronavirus por región y por comuna en Chile."
          />
        </Helmet>
        <CenteredContainer>
          <ButtonsContainer>
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
              path="/rankings/mayores-aumentos-en-casos-activos"
              onClick={() => this.getRanking(...rankingParameters['mayores-aumentos-en-casos-activos'])}
            >
            Mayores aumentos en casos activos
            </NavBubbleButton>
            <NavBubbleButton
              path="/rankings/mayores-aumentos-en-tasa-de-activos"
              onClick={() => this.getRanking(...rankingParameters['mayores-aumentos-en-tasa-de-activos'])}
            >
            Mayores aumentos en casos activos cada 100 mil habitantes
            </NavBubbleButton>
          </ButtonsContainer>

          <TableContainer>
            <Table
              headers={_.values(columns)}
              rows={rows}
              footerText={footerText}
            />
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

  margin-top: 1em;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;

  @media ${({ theme }) => theme.device.mobileL} {
    width: 75%;
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 95%;
    flex-direction: row;
    align-items: stretch;
  }

  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
  }
`;
