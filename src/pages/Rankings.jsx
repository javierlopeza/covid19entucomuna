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
    this.state = {
      loading: true,
      chileData: {},
      communes: [],
      selectedCommunes: [],
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

  mostAbsoluteActiveCases() {
    const { communes } = this.state;
    // Sort by Activos
    let selectedCommunes = _.sortBy(communes, commune => commune.activos.value);
    // Reverse
    _.reverse(selectedCommunes);
    // Get top 10
    selectedCommunes = _.take(selectedCommunes, 10);

    this.setState({ selectedCommunes });
  }

  mostRelativeActiveCases() {
    const { communes } = this.state;
    // Sort by Tasa Activos
    let selectedCommunes = _.sortBy(communes, commune => commune.tasaActivos.value);
    // Reverse
    _.reverse(selectedCommunes);
    // Get top 10
    selectedCommunes = _.take(selectedCommunes, 10);

    this.setState({ selectedCommunes });
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoaderSpinner />;
    }
    const { selectedCommunes } = this.state;
    const rows = selectedCommunes.map(
      ({
        name: comuna, region, poblacion, activos, tasaActivos,
      }) => ({
        data: [
          comuna,
          region,
          poblacion,
          activos.value,
          Math.floor(tasaActivos.value),
        ],
        path: `/regiones/${region}/comunas/${comuna}`,
      }),
    );
    return (
      <>
        <Helmet onChangeClientState={handlePageChange}>
          <title>COVID-19 en tu comuna - Preguntas Frecuentes</title>
          <meta
            name="description"
            content="Análisis simple y amigable de los casos activos de coronavirus por región y por comuna en Chile."
          />
        </Helmet>

        <div onClick={() => this.mostAbsoluteActiveCases()}>Comunas con más casos activos</div>
        <div onClick={() => this.mostRelativeActiveCases()}>Comunas con más casos activos cada 100 mil habitantes</div>

        <TableContainer>
          <Table
            headers={[
              'Comuna',
              'Región',
              'Población',
              'Casos Activos',
              'Tasa Activos',
            ]}
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
