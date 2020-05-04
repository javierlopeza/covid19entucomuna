import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import env from '../environment';
import regiones from '../data/places/regiones';
import comunas from '../data/places/comunas';

async function getChileData() {
  const response = await axios.get(env.chileDataJsonUrl);
  const { data } = response;
  return camelcaseKeys(data, { deep: true, exclude: [...regiones, ...comunas] });
}

export default getChileData;
