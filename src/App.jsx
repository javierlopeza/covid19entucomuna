import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import theme from './styles/theme';
import GlobalStyle from './styles/global';

import Home from './pages/Home';
import Region from './pages/Region';
import Comuna from './pages/Comuna';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />
      <div>
        <AppLogo to="/">Coronavirus Chile</AppLogo>
        <Route exact path="/" component={Home} />
        <Route exact path="/regiones/:region" component={Region} />
        <Route exact path="/regiones/:region/comunas/:comuna" component={Comuna} />
      </div>
    </Router>
  </ThemeProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;

const AppLogo = styled(Link)`
  color: lightseagreen;
  font-size: 3em;
`;
