import { createGlobalStyle } from 'styled-components';
import theme from './theme';

export default createGlobalStyle`
  body {
    background-color: ${theme.colors.blue.light};
  }
`;
