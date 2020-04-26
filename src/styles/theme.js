import device from './device';

export default {
  colors: {
    blue: {
      light: '#f5fbff',
      normal: 'blue',
      dark: '',
    },
    red: 'red',
    green: 'green',
  },
  baseShadow: `
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);`,
  device,
};
