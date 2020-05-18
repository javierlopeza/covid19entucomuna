import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import ReactGA from 'react-ga';
import env from '../environment';
import regions from '../data/places/regions';
import communes from '../data/places/communes';
import { CATEGORIES, ACTIONS } from '../ga/events';
import { withTimestamp } from '../utils/requests';

async function getChileData() {
  const response = await axios.get(withTimestamp(env.chileDataJsonUrl));
  const { data } = response;
  ReactGA.event({
    category: CATEGORIES.DATA,
    action: ACTIONS.FETCH,
    label: data.activos.date,
    nonInteraction: true,
  });
  return camelcaseKeys(data, { deep: true, exclude: [...regions, ...communes] });
}

export default getChileData;
