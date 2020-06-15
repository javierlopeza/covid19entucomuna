import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import ReactGA from 'react-ga';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import BoxTitle from '../components/BoxTitle';
import scrollToTop from '../utils/scrollToTop';
import { formatDateForHumans, formatValue } from '../utils/formatter';
import MetricsCards from '../components/MetricsCards';
import MetricCard from '../components/MetricCard';
import metricsIcons from '../assets/images/metrics';
import ValueChangeText from '../components/ValueChangeText';
import Breadcrumb from '../components/Breadcrumb';
import LoaderSpinner from '../components/LoaderSpinner';
import getChileData from '../clients/chile-data-fetcher';
import handlePageChange from '../utils/pageChangeHandler';
import { CATEGORIES, ACTIONS } from '../ga/events';
import { isDataFromToday } from '../utils/checkData';
import notify from '../clients/notifier';

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
    if (!chileData || !isDataFromToday(chileData)) {
      chileData = await getChileData();
    }
    if (
      _.includes(_.keys(chileData.regiones), region)
      && _.includes(_.keys(chileData.regiones[region].comunas), commune)
    ) {
      await notify();
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
      poblacion,
      tasaActivos,
      activos: currentActive,
      confirmados,
      fallecidos,
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
            content={`En ${commune} se registran ${formatValue(
              currentActive.value,
            )} casos activos al ${formatDateForHumans(
              currentActive.date,
            )}, con una tasa de ${tasaActivos.value.toFixed(
              0,
            )} casos activos por cada 100 mil habitantes.`}
          />
        </Helmet>
        <CenteredContainer>
          {/* Navigation Breadcrumbs */}
          <Breadcrumb.Container>
            <Breadcrumb.Item to={{ pathname: '/', chileData }}>
              Chile
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item to={{ pathname: `/regiones/${region}`, chileData }}>
              {regionCompleteName}
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item to={`/regiones/${region}/comunas/${commune}`}>
              {commune}
            </Breadcrumb.Item>
          </Breadcrumb.Container>
          {/* Metrics */}
          <MetricsCards.Container id="metricsContainer">
            <MetricCard
              icon={metricsIcons.population}
              label="Población"
              value={poblacion}
              tooltip="Proyección de población del año 2020 en base al CENSO 2017 (INE)"
            />
            <MetricCard
              icon={metricsIcons.confirmed}
              label="Confirmados"
              value={confirmados.value}
              tooltip={`Informe Epidemiológico MINSAL (${formatDateForHumans(confirmados.date)})`}
            />
            <MetricCard
              icon={metricsIcons.active}
              label="Activos"
              value={currentActive.value}
              tooltip={`Informe Epidemiológico MINSAL (${formatDateForHumans(currentActive.date)})`}
            />
            <MetricCard
              icon={metricsIcons.deaths}
              label="Fallecidos"
              value={fallecidos.value}
              tooltip={`Informe Epidemiológico MINSAL (${formatDateForHumans(fallecidos.date)})`}
            />
          </MetricsCards.Container>
          {/* Chart */}
          <ChartContainer>
            <BoxTitle>Casos Activos</BoxTitle>
            <CVLineChart data={series.activos} />
          </ChartContainer>
          {/* Info Texts */}
          <InfoTextsContainer>
            <InfoText>
              {`En ${commune}, entre el ${formatDateForHumans(
                previousActive.date,
              )} y el ${formatDateForHumans(
                currentActive.date,
              )}, los casos activos `}
              {valueChangeText}
            </InfoText>
            {!!tasaActivos.value && (
              <InfoText>
                {`Al ${formatDateForHumans(
                  currentActive.date,
                )}, por cada 100 mil habitantes, hay ${tasaActivos.value.toFixed(0)} casos activos.`}
              </InfoText>
            )}
          </InfoTextsContainer>
          {/* Quarantine */}
          {!!quarantine.text && (
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
  :last-child {
    margin-bottom: 0;
  }

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
  line-height: 1.25em;
`;
