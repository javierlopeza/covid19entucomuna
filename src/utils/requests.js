import moment from './date';

export function withTimestamp(url) {
  const ts = moment().unix();
  return `${url}?timestamp=${ts}`;
}
