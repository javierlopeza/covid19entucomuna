import _ from 'lodash';

function chooseRepoData(officialData, backupData) {
  const officialSample = _.pickBy(officialData[0], (value, key) => key.startsWith('2020'));
  const backupSample = _.pickBy(backupData[0], (value, key) => key.startsWith('2020'));

  const officialLastDate = _.max(_.keys(officialSample));
  const backupLastDate = _.max(_.keys(backupSample));

  if (officialLastDate >= backupLastDate) {
    return officialData;
  }
  return backupData;
}

export default chooseRepoData;
