import styled from 'styled-components';

const BoxTitle = styled.h1`
  color: ${({ theme, warning, color }) => (warning ? theme.colors.red.normal : color)};
  font-weight: 400;
  text-align: center;
`;

export default BoxTitle;
