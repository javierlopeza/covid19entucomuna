import styled, { css } from 'styled-components';

const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
  ${({ theme: { device } }) => css`
    @media ${device.laptop} {
        width: 75%;
    }
  `}
`;

export default ChartContainer;
