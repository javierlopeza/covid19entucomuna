import styled, { css } from 'styled-components';

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  height: 320px;
  width: 95%;
  ${({ theme: { device } }) => css`
    @media ${device.laptop} {
      width: 75%;
    }
  `}

  background-color: white;
  padding: 20px;
  border-radius: 10px;

  ${({ theme }) => theme.baseShadow}
`;

export default ChartContainer;
