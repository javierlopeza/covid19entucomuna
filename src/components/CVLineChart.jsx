import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import theme from '../styles/theme';
import {
  formatValue,
  formatDaysSinceEpoch,
  formatDaysSinceEpochForHumans,
} from '../utils/formatter';
import { daysSinceEpoch } from '../utils/daysSinceEpoch';

const CVLineChart = (props) => {
  const { data } = props;

  // Numericalize x-axis dates
  const chartData = data.map(dp => ({
    ...dp,
    date: daysSinceEpoch(dp.date),
  }));

  const showDots = data.length < 30;
  return (
    <ResponsiveContainer>
      <CustomChart data={chartData}>
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="10%" stopColor="#7c97fc" stopOpacity={0.9} />
            <stop offset="300%" stopColor="#a9beff" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          type="number"
          domain={['dataMin', 'dataMax']}
          allowDecimals={false}
          tickFormatter={formatDaysSinceEpoch}
          tickCount={100}
        />
        <YAxis tickFormatter={formatValue} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip
          labelFormatter={formatDaysSinceEpochForHumans}
          formatter={formatValue}
        />
        <Area
          dataKey="value"
          name="Casos Activos"
          legendType="line"
          type="monotone"
          stroke={theme.colors.blue.normal}
          strokeWidth={2.5}
          dot={
            showDots && {
              fill: 'white',
              r: 2.5,
              stroke: theme.colors.blue.normal,
              strokeWidth: 2,
            }
          }
          activeDot={{
            fill: theme.colors.blue.normal,
            r: 6,
            stroke: 'white',
            strokeWidth: 2,
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
  margin-left: -5px;
  @media ${theme.device.laptop} {
    margin: 0;
  }

  .recharts-cartesian-axis-tick-value tspan,
  .recharts-default-tooltip * {
    font-size: 14px;
    @media ${theme.device.laptop} {
      font-size: 16px;
    }
  }

  .recharts-yAxis .recharts-cartesian-axis-tick:first-child {
    text {
      transform: translateY(-5px);
    }
  }
`;
