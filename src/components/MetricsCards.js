import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 95%;
  margin-bottom: 1em;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  gap: 0.5em 0;

  ${({ theme: { device } }) => css`
    @media ${device.mobileM} {
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5em 0.5em;
    }
    @media ${device.tablet} {
      width: 95%;
      grid-template-rows: none;
      grid-template-columns: repeat(4, 1fr);
      gap: 0 1em;
    }
    @media ${device.laptop} {
      width: 75%;
    }
  `}
`;

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  ${({ theme }) => css`
    ${theme.baseShadow}
  `}
  height: 40px;

  padding: 10px 20px;
  font-size: 0.75em;
  ${({ theme: { device } }) => css`
    @media ${device.mobileM} {
      padding: 16px;
    }
    @media ${device.mobileL} {
      padding: 20px;
      font-size: 0.9em;
    }
  `}
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: inherit;
`;

const Icon = styled.img`
  height: 100%;
  margin-right: 1em;
`;

const Label = styled.p`
  margin: 0;
  margin-bottom: 5px;
  font-weight: 400;
  font-size: inherit;
`;

const Value = styled.p`
  margin: 0;
  font-size: inherit;
`;

export default {
  Container,
  Card,
  TextContainer,
  Icon,
  Label,
  Value,
};
