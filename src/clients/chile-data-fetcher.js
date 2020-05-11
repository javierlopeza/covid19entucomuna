import camelcaseKeys from 'camelcase-keys';
import ReactGA from 'react-ga';
import regions from '../data/places/regions';
import communes from '../data/places/communes';
import { CATEGORIES, ACTIONS } from '../ga/events';

const chileData = require('../data/chile-minified.json');

async function getChileData() {
  ReactGA.event({
    category: CATEGORIES.DATA,
    action: ACTIONS.FETCH,
    label: chileData.activos.date,
    nonInteraction: true,
  });
  return camelcaseKeys(chileData, { deep: true, exclude: [...regions, ...communes] });
}

export default getChileData;
