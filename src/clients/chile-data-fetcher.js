import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import env from '../environment';
import regions from '../data/places/regions';
import communes from '../data/places/communes';

async function getChileData() {
  const response = await axios.get(env.chileDataJsonUrl);
  const { data } = response;
  return camelcaseKeys(data, { deep: true, exclude: [...regions, ...communes] });
}

export default getChileData;
