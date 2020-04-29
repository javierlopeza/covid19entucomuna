import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet';
import mincienciaFetcher from '../clients/minciencia-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import ChartTitle from '../components/ChartTitle';
import formatter from '../utils/formatter';
import scrollToTop from '../utils/scrollToTop';
import ValueChangeText from '../components/ValueChangeText';
import fixComunaName from '../utils/fixComunaName';
import { Loader } from '../components/Loader';

class Comuna extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      comuna: null,
      dataComuna: {},
      totalesComuna: [],
      loading: true,
    };
  }

  async componentDidMount() {
    scrollToTop();
    const {
      match: {
        params: { region, comuna },
      },
    } = this.props;
    let {
      location: { dataComunasRegion },
    } = this.props;
    if (!dataComunasRegion) {
      const dataPorComuna = await mincienciaFetcher.getAllDataPorComuna();
      dataComunasRegion = dataPorComuna[region].comunas;
    }
    try {
      const dataComuna = dataComunasRegion[comuna];
      const totalesComuna = dataComuna.totales;
      this.setState({
        region,
        comuna,
        dataComuna,
        totalesComuna,
        loading: false,
      });
    } catch (err) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loader />;
    }
    const {
      region, comuna, dataComuna, totalesComuna,
    } = this.state;
    const lastData = !!totalesComuna.length && totalesComuna.slice(-1)[0];
    const secondToLastData = !!totalesComuna.length && totalesComuna.slice(-2)[0];
    const tasaActivos = (lastData['Casos activos'] / dataComuna.Poblacion) * 100000;
    const valueChangeText = <ValueChangeText data={[secondToLastData['Casos activos'], lastData['Casos activos']]} />;
    return (
      <>
        <Helmet>
          <title>{`COVID-19 en tu comuna - ${fixComunaName(comuna)}`}</title>
          <meta name="description" content={`En ${comuna} se registran ${formatter.valueFormatter(lastData['Casos activos'])} casos activos al ${formatter.dateFormatter(lastData.date)}, con una tasa de ${tasaActivos.toFixed(0)} casos activos por cada 100 mil habitantes.`} />
        </Helmet>
        <CenteredContainer>
          {/* Chart */}
          <ChartContainer>
            <ChartTitle>
              {`Región ${region} - ${fixComunaName(comuna)}`}
            </ChartTitle>
            <CVLineChart data={totalesComuna} />
          </ChartContainer>
          {/* Info Texts */}
          <InfoTextsContainer>
            <InfoText>
              {`En ${fixComunaName(comuna)}, entre el ${formatter.dateFormatter(secondToLastData.date)} y el ${formatter.dateFormatter(lastData.date)}, los casos activos `}
              {valueChangeText}
            </InfoText>
            <InfoText>
              { `Por cada 100 mil habitantes, hay ${tasaActivos.toFixed(0)} casos activos.`}
            </InfoText>
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
