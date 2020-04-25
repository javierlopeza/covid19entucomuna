import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import moment from '../utils/date';

const valueFormatter = value => value.toLocaleString();

const dateFormatter = dateStr => moment(dateStr).format('DD-MMMM');

const CVLineChart = (props) => {
  const { data } = props;
  return (
    <AreaChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 30,
        right: 30,
        left: 20,
        bottom: 30,
      }}
    >
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="10%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" tickFormatter={dateFormatter} />
      <YAxis tickFormatter={valueFormatter} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip labelFormatter={dateFormatter} formatter={valueFormatter} />
      <Legend />
      <Area
        dataKey="Casos activos"
        unit=" personas"
        legendType="line"
        type="monotone"
        stroke="#8884d8"
        dot={{
          fill: 'white', r: 2, stroke: '#8884d8', strokeWidth: 2,
        }}
        activeDot={{
          fill: '#8884d8', r: 6, stroke: 'white', strokeWidth: 2,
        }}
        fillOpacity={1}
        fill="url(#chartGradient)"
      />
    </AreaChart>
  );
};

export default CVLineChart;
