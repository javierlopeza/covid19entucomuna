import styled from 'styled-components';

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  height: 350px;
  width: 95%;
  @media ${({ theme }) => theme.device.laptop} {
    width: 75%;
  }

  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;

  ${({ theme }) => theme.baseShadow}
`;

export default ChartContainer;
