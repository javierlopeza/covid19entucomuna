import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styled, { css } from 'styled-components';
import formatter from '../utils/formatter';

const CVLineChart = (props) => {
  const { data } = props;
  return (
    <ResponsiveContainer>
      <CustomChart data={data}>
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickFormatter={formatter.dateFormatter} />
        <YAxis tickFormatter={formatter.valueFormatter} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip labelFormatter={formatter.dateFormatter} formatter={formatter.valueFormatter} />
        <Legend />
        <Area
          dataKey="Casos activos"
          // unit=" personas"
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
      </CustomChart>
    </ResponsiveContainer>
  );
};

export default CVLineChart;

const CustomChart = styled(AreaChart)`
  .recharts-cartesian-axis-tick-value tspan,
  .recharts-default-tooltip * {
    font-size: 14px;

    ${({ theme: { device } }) => css`
    @media ${device.laptop} {
      font-size: 18px;
    }
  `}

  }
`;
