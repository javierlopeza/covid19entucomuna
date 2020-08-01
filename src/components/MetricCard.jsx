import React from 'react';
import MetricsCards from './MetricsCards';
import MetricCardTooltip from './MetricCardTooltip';
import { formatValue } from '../utils/formatter';

const MetricCard = ({
  icon, label, value, tooltip, onClick,
}) => (
  <MetricsCards.Card onClick={onClick}>
    <MetricsCards.Icon src={icon} />
    <MetricsCards.TextContainer>
      <MetricsCards.Label>{label}</MetricsCards.Label>
      <MetricsCards.Value>{formatValue(value)}</MetricsCards.Value>
    </MetricsCards.TextContainer>
    <MetricCardTooltip>{tooltip}</MetricCardTooltip>
  </MetricsCards.Card>
);

export default MetricCard;
