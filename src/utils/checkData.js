import moment from './date';

export function isDataFromToday(chileData) {
  const dataDate = chileData.activos.date;
  const today = moment().format('YYYY-MM-DD');
  console.log(dataDate === today);
  return dataDate === today;
}
