import styled from 'styled-components';

const BoxTitle = styled.h1`
  color: ${({ theme, warning }) => (warning ? theme.colors.red.normal : theme.colors.blue.normal)};
  font-weight: 400;
  text-align: center;
`;

export default BoxTitle;
