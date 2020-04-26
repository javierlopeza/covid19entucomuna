import React, { Component } from 'react';
import mincienciaFetcher from '../clients/minciencia-fetcher';
import CVLineChart from '../components/CVLineChart';
import ChartContainer from '../components/ChartContainer';
import CenteredContainer from '../components/CenteredContainer';
import PageTitle from '../components/PageTitle';
import formatter from '../utils/formatter';
import scrollToTop from '../utils/scrollToTop';

class Comuna extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      comuna: null,
      dataComuna: {},
      totalesComuna: [],
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
      });
    } catch (err) {
      const { history } = this.props;
      history.push('/');
    }
  }

  render() {
    const {
      region, comuna, dataComuna, totalesComuna,
    } = this.state;
    const lastData = !!totalesComuna.length && totalesComuna.slice(-1)[0];
    const secondToLastData = !!totalesComuna.length && totalesComuna.slice(-2)[0];
    const tasaActivos = (lastData['Casos activos'] / dataComuna.Poblacion) * 100000;
    return (
      <CenteredContainer>
        <ChartContainer>
          <PageTitle>
            {region && comuna && `Región ${region} - ${comuna}`}
          </PageTitle>
          {!!totalesComuna.length && <CVLineChart data={totalesComuna} />}
        </ChartContainer>
        <p>
          {!!secondToLastData
            && `En ${comuna}, entre el ${formatter.dateFormatter(secondToLastData.date)} y el ${formatter.dateFormatter(lastData.date)}, los casos activos ${formatter.valueChangeTextFormatter(secondToLastData['Casos activos'], lastData['Casos activos'])}.`}
        </p>
        <p>
          {!!tasaActivos
            && `Por cada 100 mil habitantes, hay ${tasaActivos.toFixed(0)} casos activos.`}
        </p>
      </CenteredContainer>
    );
  }
}

export default Comuna;
