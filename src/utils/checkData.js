import moment from './date';

export function isDataFromToday(chileData) {
  const dataDate = chileData.activos.date;
  const today = moment().format('YYYY-MM-DD');
  return dataDate === today;
}
