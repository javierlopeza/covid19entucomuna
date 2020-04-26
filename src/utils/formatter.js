import moment from './date';

const valueFormatter = value => value.toLocaleString();

const dateFormatter = dateStr => moment(dateStr).format('DD-MMMM');

export default {
  valueFormatter,
  dateFormatter,
};
