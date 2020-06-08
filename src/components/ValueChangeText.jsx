import React from 'react';
import styled, { css } from 'styled-components';
import { formatValue } from '../utils/formatter';

const ValueChangeText = ({ data }) => {
  const [prev, curr] = data;
  if (prev < curr) {
    return (
      <>
        <Colored color="red">aumentaron</Colored>
        {` de ${formatValue(prev)} a ${formatValue(curr)}.`}
      </>
    );
  }
  if (prev > curr) {
    return (
      <>
        <Colored color="green">disminuyeron</Colored>
        {` de ${formatValue(prev)} a ${formatValue(curr)}.`}
      </>
    );
  }
  return <>{`se mantuvieron en ${prev}.`}</>;
};

export default ValueChangeText;

const Colored = styled.span`
  ${({ theme, color }) => css`
    color: ${theme.colors[color].dark};
  `}
  font-weight: 200;
`;
