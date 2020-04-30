import Papa from 'papaparse';
import _ from 'lodash';
import env from '../environment';
import renameKeys from '../utils/renameKeys';
import chartData from '../utils/chartData';
import chooseRepoData from '../utils/chooseRepoData';

async function getCsv(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      complete(results) {
        resolve(results);
      },
      error(error) {
        reject(error);
      },
    });
  });
}

function groupByRegionAndComuna(data) {
  const regiones = _.groupBy(data, 'Region');
  _.keys(regiones).forEach((region) => {
    const comunas = _.keyBy(regiones[region], 'Comuna');
    regiones[region] = { comunas };
  });
  return renameKeys.renameRegiones(regiones);
}

function groupHistoryOfComunaData(regiones, dataName, startsWithToken) {
  _.forEach(regiones, ({ comunas }) => {
    _.forEach(comunas, (comuna) => {
      comuna[dataName] = _.pickBy(comuna, (value, key) => key.startsWith(startsWithToken));
    });
  });
}

function moveTotalesToRegiones(regiones) {
  _.forEach(regiones, ({ comunas }, region) => {
    regiones[region].totales = chartData.transformDataForChart(
      _.pick(comunas.Total, [
        'Casos confirmados',
        'Casos nuevos',
        'Casos activos',
      ]),
    );
    regiones[region].poblacion = comunas.Total.Poblacion;
    delete comunas.Total;
  });
}

function buildComunasTotales(regiones) {
  _.forEach(regiones, ({ comunas }, region) => {
    _.forEach(comunas, (dataComuna, comuna) => {
      comunas[comuna].totales = chartData.transformDataForChart(
        _.pick(dataComuna, [
          'Casos activos',
        ]),
      );
    });
  });
}

function addFallecidosToRegiones(regiones, fallecidos) {
  _.keys(regiones).forEach((region) => {
    const date = _.max(_.keys(fallecidos[region]));
    regiones[region].fallecidos = { date, value: fallecidos[region][date] };
  });
}

function addConfirmadosToRegiones(regiones, confirmados) {
  _.keys(regiones).forEach((region) => {
    const date = _.max(_.keys(confirmados[region]));
    regiones[region].confirmados = { date, value: confirmados[region][date] };
  });
}
async function getActivosPorComuna() {
  const { data } = await getCsv(env.activosPorComunaCsvUrl);
  const regiones = groupByRegionAndComuna(data);
  groupHistoryOfComunaData(regiones, 'Casos activos', '2020');
  return regiones;
}

async function getFallecidosPorRegion() {
  const { data: officialData } = await getCsv(env.fallecidosPorRegionCsvUrl);
  const { data: backupData } = await getCsv(env.backupFallecidosPorRegionCsvUrl);
  const data = chooseRepoData(officialData, backupData);
  data.splice(_.findIndex(data, ['Region', 'Total']), 1);
  const regiones = _.mapKeys(data, value => value.Region);
  _.keys(regiones).forEach((key) => {
    delete regiones[key].Region;
  });
  return regiones;
}

async function getConfirmadosPorRegion() {
  const { data: officialData } = await getCsv(env.confirmadosPorRegionCsvUrl);
  const { data: backupData } = await getCsv(env.backupConfirmadosPorRegionCsvUrl);
  const data = chooseRepoData(officialData, backupData);
  data.splice(_.findIndex(data, ['Region', 'Total']), 1);
  const regiones = _.mapKeys(data, value => value.Region);
  _.keys(regiones).forEach((key) => {
    delete regiones[key].Region;
  });
  return regiones;
}

async function getAllDataPorComuna() {
  const activosPorComuna = await getActivosPorComuna();
  const allDataPorComuna = _.merge(
    activosPorComuna,
  );
  moveTotalesToRegiones(allDataPorComuna);
  buildComunasTotales(allDataPorComuna);
  const fallecidosPorRegion = await getFallecidosPorRegion();
  addFallecidosToRegiones(allDataPorComuna, fallecidosPorRegion);
  const confirmadosPorRegion = await getConfirmadosPorRegion();
  addConfirmadosToRegiones(allDataPorComuna, confirmadosPorRegion);
  return allDataPorComuna;
}

async function getTotalesNacionales() {
  const { data: officialData } = await getCsv(env.totalesNacionalesCsvUrl);
  const { data: backupData } = await getCsv(env.backupTotalesNacionalesCsvUrl);
  const data = chooseRepoData(officialData, backupData);
  const totalesNacionales = _.mapKeys(data, value => value.Fecha);
  _.keys(totalesNacionales).forEach((key) => {
    delete totalesNacionales[key].Fecha;
  });
  return chartData.transformDataForChart(totalesNacionales);
}

const mincienciaFetcher = {
  getAllDataPorComuna,
  getTotalesNacionales,
};

export default mincienciaFetcher;
