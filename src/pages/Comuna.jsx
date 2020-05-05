import React, { Component } from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import ChartTitle from '../components/ChartTitle';
import formatter from '../utils/formatter';
import scrollToTop from '../utils/scrollToTop';
import ValueChangeText from '../components/ValueChangeText';
import Breadcrumb from '../components/Breadcrumb';
import LoaderSpinner from '../components/LoaderSpinner';
import getChileData from '../clients/chile-data-fetcher';
import handlePageChange from '../utils/pageChangeHandler';

class Comuna extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comuna: null,
      region: null,
      chileData: {},
      loading: true,
    };
  }

  async componentDidMount() {
    scrollToTop();
    const { match: { params: { region, comuna } } } = this.props;
    let { location: { chileData } } = this.props;
    if (!chileData) {
      chileData = await getChileData();
    }
    if (
      _.keys(chileData.regiones).includes(region)
      && _.keys(chileData.regiones[region].comunas).includes(comuna)
    ) {
      this.setState({
        comuna,
        region,
        chileData,
        loading: false,
      });
    } else {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <LoaderSpinner />;
    }
    const { region, comuna, chileData } = this.state;
    const { completeName: regionCompleteName } = chileData.regiones[region];
    const {
      tasaActivos,
      activos: currentActivos,
      previous: { activos: previousActivos },
      series,
    } = chileData.regiones[region].comunas[comuna];
    const valueChangeText = (
      <ValueChangeText data={[previousActivos.value, currentActivos.value]} />
    );
    return (
      <>
        <Helmet onChangeClientState={handlePageChange}>
          <title>{`COVID-19 en tu comuna - ${comuna}`}</title>
          <meta
            name="description"
            content={`En ${comuna} se registran ${formatter.valueFormatter(
              currentActivos.value,
            )} casos activos al ${formatter.dateFormatter(
              currentActivos.date,
            )}, con una tasa de ${tasaActivos.value.toFixed(
              0,
            )} casos activos por cada 100 mil habitantes.`}
          />
        </Helmet>
        <CenteredContainer>
          {/* Navigation Breadcrumbs */}
          <Breadcrumb.Container>
            <Breadcrumb.Item to="/">Chile</Breadcrumb.Item>
            <Breadcrumb.Item to={`/regiones/${region}`}>
              {regionCompleteName}
            </Breadcrumb.Item>
            <Breadcrumb.Item to={`/regiones/${region}/comunas/${comuna}`}>
              {comuna}
            </Breadcrumb.Item>
          </Breadcrumb.Container>
          {/* Chart */}
          <ChartContainer>
            <ChartTitle>Casos Activos</ChartTitle>
            <CVLineChart data={series.activos} />
          </ChartContainer>
          {/* Info Texts */}
          <InfoTextsContainer>
            <InfoText>
              {`En ${comuna}, entre el ${formatter.dateFormatter(
                previousActivos.date,
              )} y el ${formatter.dateFormatter(
                currentActivos.date,
              )}, los casos activos `}
              {valueChangeText}
            </InfoText>
            {!!tasaActivos.value && (
              <InfoText>
                {`Por cada 100 mil habitantes, hay ${tasaActivos.value.toFixed(0)} casos activos.`}
              </InfoText>
            )}
          </InfoTextsContainer>
        </CenteredContainer>
      </>
    );
  }
}

export default Comuna;

const InfoTextsContainer = styled.div`
  background-color: white;
  ${({ theme }) => theme.baseShadow}
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  width: 95%;
  ${({ theme: { device } }) => css`
    @media ${device.laptop} {
      width: 75%;
    }
  `}
`;

const InfoText = styled.p`
  margin: 10px;
  text-align: center;
`;
