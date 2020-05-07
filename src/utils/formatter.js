import moment from './date';

export const valueFormatter = value => value.toLocaleString('de-DE');

export const dateFormatter = dateStr => moment(dateStr).format('DD-MMMM');
