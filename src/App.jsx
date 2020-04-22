import React from 'react';
import { hot } from 'react-hot-loader/root';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import theme from './styles/theme';
import GlobalStyle from './styles/global';

import Home from './pages/Home';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />
      <div>
        <h1>App</h1>
        <Link to="/">Home</Link>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  </ThemeProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
