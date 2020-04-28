import Papa from 'papaparse';
import _ from 'lodash';
import env from '../environment';
import renameKeys from '../utils/renameKeys';
import chartData from '../utils/chartData';

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
          // 'Casos confirmados',
          // 'Casos nuevos',
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

async function getConfirmadosPorComuna() {
  const { data } = await getCsv(env.confirmadosPorComunaCsvUrl);
  const regiones = groupByRegionAndComuna(data);
  groupHistoryOfComunaData(regiones, 'Casos confirmados', '2020');
  return regiones;
}

async function getNuevosPorComuna() {
  const { data } = await getCsv(env.nuevosPorComunaCsvUrl);
  const regiones = groupByRegionAndComuna(data);
  groupHistoryOfComunaData(regiones, 'Casos nuevos', 'SE');
  return regiones;
}

async function getActivosPorComuna() {
  const { data } = await getCsv(env.activosPorComunaCsvUrl);
  const regiones = groupByRegionAndComuna(data);
  groupHistoryOfComunaData(regiones, 'Casos activos', '2020');
  return regiones;
}

async function getFallecidosPorRegion() {
  const { data } = await getCsv(env.fallecidosPorRegionCsvUrl);
  data.splice(_.findIndex(data, ['Region', 'Total']), 1);
  const regiones = _.mapKeys(data, value => value.Region);
  _.keys(regiones).forEach((key) => {
    delete regiones[key].Region;
  });
  return regiones;
}

async function getAllDataPorComuna() {
  const confirmadosPorComuna = await getConfirmadosPorComuna();
  const nuevosPorComuna = await getNuevosPorComuna();
  const activosPorComuna = await getActivosPorComuna();
  const allDataPorComuna = _.merge(
    confirmadosPorComuna,
    nuevosPorComuna,
    activosPorComuna,
  );
  moveTotalesToRegiones(allDataPorComuna);
  buildComunasTotales(allDataPorComuna);
  const fallecidosPorRegion = await getFallecidosPorRegion();
  addFallecidosToRegiones(allDataPorComuna, fallecidosPorRegion);
  return allDataPorComuna;
}

async function getTotalesNacionales() {
  const { data } = await getCsv(env.totalesNacionalesCsvUrl);
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
