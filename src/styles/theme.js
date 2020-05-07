import device from './device';

export default {
  colors: {
    blue: {
      light: '#f5fbff',
      normal: '#5b78ff',
    },
    red: {
      normal: '#ff788f',
      dark: '#ff002b',
    },
    green: {
      dark: '#00a500',
    },
    gray: {
      normal: '#6b6b6b',
    },
  },

  baseShadow: `
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);`,

  device,
};
