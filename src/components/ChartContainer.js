import styled, { css } from 'styled-components';

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 300px;
  width: 100%;
  ${({ theme: { device } }) => css`
    @media ${device.laptop} {
      width: 75%;
    }
  `}

  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

export default ChartContainer;
