import Papa from 'papaparse';
import _ from 'lodash';
import env from '../environment';
import renameKeys from '../utils/renameKeys';

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
    regiones[region].total = comunas.Total;
    delete comunas.Total;
  });
}

async function getConfirmadosPorComuna() {
  const { data } = await getCsv(env.confirmadosPorComunaCsvUrl);
  const regiones = groupByRegionAndComuna(data);
  groupHistoryOfComunaData(regiones, 'historialConfirmados', '2020');
  return regiones;
}

async function getNuevosPorComuna() {
  const { data } = await getCsv(env.nuevosPorComunaCsvUrl);
  const regiones = groupByRegionAndComuna(data);
  groupHistoryOfComunaData(regiones, 'historialNuevos', 'SE');
  return regiones;
}

async function getActivosPorComuna() {
  const { data } = await getCsv(env.activosPorComunaCsvUrl);
  const regiones = groupByRegionAndComuna(data);
  groupHistoryOfComunaData(regiones, 'historialActivos', '2020');
  return regiones;
}

async function getAllDataPorComuna() {
  const confirmadosPorComuna = await getConfirmadosPorComuna();
  const nuevosPorComuna = await getNuevosPorComuna();
  const activosPorComuna = await getActivosPorComuna();
  const allDataPorComuna = _.merge(confirmadosPorComuna, nuevosPorComuna, activosPorComuna);
  moveTotalesToRegiones(allDataPorComuna);
  return allDataPorComuna;
}

async function getTotalesNacionales() {
  const { data } = await getCsv(env.totalesNacionalesCsvUrl);
  const totalesNacionales = _.mapKeys(data, value => value.Fecha);
  _.keys(totalesNacionales).forEach((key) => {
    delete totalesNacionales[key].Fecha;
  });
  return totalesNacionales;
}

const mincienciaFetcher = {
  getAllDataPorComuna,
  getTotalesNacionales,
};

export default mincienciaFetcher;
