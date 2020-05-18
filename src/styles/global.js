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

  /* Notifications */
  .notification-item .notification-title {
    font-weight: 600;
  }
  .notification-item .notification-message {
    font-weight: 200;
  }
  .notification-info {
    background-color: ${theme.colors.blue.normal};
    border-left: none;
    .timer {
      background-color: ${theme.colors.blue.dark};
    }
  }
  .notification-item .notification-close {
    background-color: transparent;
    ::after {
      font-size: 14px;
    }
  }
`;
