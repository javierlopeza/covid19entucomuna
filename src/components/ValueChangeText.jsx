import React from 'react';
import styled, { css } from 'styled-components';

const ValueChangeText = ({ data }) => {
  const [prev, curr] = data;
  if (prev < curr) {
    return (
      <>
        <Colored color="red">aumentaron</Colored>
        {` de ${prev} a ${curr}.`}
      </>
    );
  }
  if (prev > curr) {
    return (
      <>
        <Colored color="green">disminuyeron</Colored>
        {` de ${prev} a ${curr}.`}
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
