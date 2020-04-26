import moment from './date';

const valueFormatter = value => value.toLocaleString();

const dateFormatter = dateStr => moment(dateStr).format('DD-MMMM');

function valueChangeTextFormatter(prev, curr) {
  if (prev < curr) {
    return `aumentaron de ${prev} a ${curr}`;
  } if (prev > curr) {
    return `disminuyeron de ${prev} a ${curr}`;
  }
  return `se mantuvieron en ${prev}`;
}

export default {
  valueFormatter,
  dateFormatter,
  valueChangeTextFormatter,
};
