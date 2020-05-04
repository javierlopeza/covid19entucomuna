import axios from 'axios';
import env from '../environment';

async function getChileData() {
  const response = await axios.get(env.chileDataJsonUrl);
  return response.data;
}

export default getChileData;
