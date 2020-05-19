import moment from './date';

export const formatValue = value => value.toLocaleString('de-DE');

export const formatDate = dateStr => moment(dateStr).format('DD-MMMM');

export const formatDateForHumans = dateStr => moment(dateStr).format('D [de] MMMM');
