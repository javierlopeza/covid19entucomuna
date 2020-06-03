import moment from './date';

const epochDate = '1970-01-01';

export const daysSinceEpoch = (dateStr) => {
  const date = moment(dateStr);
  const days = date.diff(moment(epochDate), 'days');
  return days;
};

export const parseDaysSinceEpoch = (days) => {
  const date = moment(epochDate).add(days, 'days');
  return date;
};
