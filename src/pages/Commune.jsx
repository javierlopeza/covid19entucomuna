import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import BoxTitle from '../components/BoxTitle';
import formatter from '../utils/formatter';
import scrollToTop from '../utils/scrollToTop';
import ValueChangeText from '../components/ValueChangeText';
import Breadcrumb from '../components/Breadcrumb';
import LoaderSpinner from '../components/LoaderSpinner';
import getChileData from '../clients/chile-data-fetcher';
import handlePageChange from '../utils/pageChangeHandler';
import { CATEGORIES, ACTIONS } from '../ga/events';

class Commune extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commune: null,
      region: null,
      chileData: {},
      loading: true,
    };
  }

  async componentDidMount() {
    scrollToTop();
    const { match: { params: { region, commune } } } = this.props;
    let { location: { chileData } } = this.props;
    if (!chileData) {
      chileData = await getChileData();
    }
    if (
      _.keys(chileData.regiones).includes(region)
      && _.keys(chileData.regiones[region].comunas).includes(commune)
    ) {
      this.setState({
        commune,
        region,
        chileData,
        loading: false,
      });
      ReactGA.event({
        category: CATEGORIES.COMUNA,
        action: ACTIONS.ENTER_PAGE,
        label: commune,
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
    const { region, commune, chileData } = this.state;
    const { completeName: regionCompleteName } = chileData.regiones[region];
    const {
      tasaActivos,
      activos: currentActive,
      previous: { activos: previousActive },
      series,
      quarantine,
    } = chileData.regiones[region].comunas[commune];
    const valueChangeText = (
      <ValueChangeText data={[previousActive.value, currentActive.value]} />
    );
    return (
      <>
        <Helmet onChangeClientState={handlePageChange}>
          <title>{`COVID-19 en tu comuna - ${commune}`}</title>
          <meta
            name="description"
            content={`En ${commune} se registran ${formatter.valueFormatter(
              currentActive.value,
            )} casos activos al ${formatter.dateFormatter(
              currentActive.date,
            )}, con una tasa de ${tasaActivos.value.toFixed(
              0,
            )} casos activos por cada 100 mil habitantes.`}
          />
        </Helmet>
        <CenteredContainer>
          {/* Navigation Breadcrumbs */}
          <Breadcrumb.Container>
            <Breadcrumb.Item to="/">Chile</Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item to={`/regiones/${region}`}>
              {regionCompleteName}
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item to={`/regiones/${region}/comunas/${commune}`}>
              {commune}
            </Breadcrumb.Item>
          </Breadcrumb.Container>
          {/* Chart */}
          <ChartContainer>
            <BoxTitle>Casos Activos</BoxTitle>
            <CVLineChart data={series.activos} />
          </ChartContainer>
          {/* Info Texts */}
          <InfoTextsContainer>
            <InfoText>
              {`En ${commune}, entre el ${formatter.dateFormatter(
                previousActive.date,
              )} y el ${formatter.dateFormatter(
                currentActive.date,
              )}, los casos activos `}
              {valueChangeText}
            </InfoText>
            {!!tasaActivos.value && (
              <InfoText>
                {`Por cada 100 mil habitantes, hay ${tasaActivos.value.toFixed(0)} casos activos.`}
              </InfoText>
            )}
          </InfoTextsContainer>
          {/* Quarantine */}
          {!!quarantine.isActive && (
          <InfoTextsContainer>
            <BoxTitle warning>Cuarentena</BoxTitle>
            <InfoText>
              {quarantine.text}
            </InfoText>
          </InfoTextsContainer>
          )}
        </CenteredContainer>
      </>
    );
  }
}

export default Commune;

const InfoTextsContainer = styled.div`
  background-color: white;
  ${({ theme }) => theme.baseShadow}
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  width: 95%;
  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
  }
`;

const InfoText = styled.p`
  margin: 10px;
  text-align: center;
`;
