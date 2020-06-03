import moment from './date';
import { parseDaysSinceEpoch } from './daysSinceEpoch';

export const formatValue = value => value.toLocaleString('de-DE');

export const formatDate = dateStr => moment(dateStr).format('DD-MMMM');

export const formatDateForHumans = dateStr => moment(dateStr).format('D [de] MMMM');

export const formatDaysSinceEpoch = days => parseDaysSinceEpoch(days).format('DD-MMMM');

export const formatDaysSinceEpochForHumans = days => parseDaysSinceEpoch(days).format('D [de] MMMM');
