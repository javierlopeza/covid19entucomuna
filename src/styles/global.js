import { createGlobalStyle } from 'styled-components';
import theme from './theme';

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.colors.blue.light};
  }
  * {
    font-family: 'GothamPro';
    font-weight: 100;
    font-size: 18px;
  }
  a {
    text-decoration: none;
  }
`;
