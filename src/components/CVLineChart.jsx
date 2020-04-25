import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CVLineChart = (props) => {
  const { data } = props;
  return (
    <LineChart
      width={1000}
      height={600}
      data={data}
      margin={{
        top: 30,
        right: 30,
        left: 20,
        bottom: 30,
      }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Casos activos"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
        isAnimationActive
      />
    </LineChart>
  );
};

export default CVLineChart;
