import _ from 'lodash';

function baseStrategy(communes, sortKeyPath, n = 10, reverse = true) {
  let selectedCommunes = _.sortBy(communes, commune => _.get(commune, sortKeyPath));
  if (reverse) {
    _.reverse(selectedCommunes);
  }
  selectedCommunes = _.take(selectedCommunes, n);

  return selectedCommunes;
}

export default function rank(communes, sortKeyPath) {
  return baseStrategy(communes, sortKeyPath);
}
