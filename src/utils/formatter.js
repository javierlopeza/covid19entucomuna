import moment from './date';
import { parseDaysSinceEpoch } from './daysSinceEpoch';

export const formatValue = value => value.toLocaleString('de-DE');

export const formatDeltaValue = value => (value < 0 ? '' : '+') + value;

export const formatDate = dateStr => moment(dateStr).format('DD-MMMM');

export const formatDateForHumans = dateStr => moment(dateStr).format('D [de] MMMM');

export const formatDaysSinceEpoch = days => parseDaysSinceEpoch(days).format('DD-MMMM');

export const formatDaysSinceEpochForHumans = days => parseDaysSinceEpoch(days).format('D [de] MMMM');
