import moment from './date';

export function isDataFromToday(chileData) {
  // Is data from today if now is before data date's next day at 8 AM
  const dataDate = moment(chileData.activos.date, 'YYYY-MM-DD');
  const limitTime = moment(dataDate).add(1, 'days').hours(8);
  const now = moment();
  return now.isBefore(limitTime);
}
