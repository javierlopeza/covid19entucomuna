import _ from 'lodash';

function transposeDataForChart(series, attr) {
  return _.keys(series).map(date => ({ date, [attr]: series[date] }));
}

function transformDataForChart(data) {
  const transposedSeries = _.keys(data).map(attr => transposeDataForChart(data[attr], attr));
  return _.zip(...transposedSeries).map(dateValues => _.merge(...dateValues));
}

export default { transformDataForChart };
