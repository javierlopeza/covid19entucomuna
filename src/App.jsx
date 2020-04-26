import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import theme from './styles/theme';
import GlobalStyle from './styles/global';

import Home from './pages/Home';
import Region from './pages/Region';
import Comuna from './pages/Comuna';
import CenteredContainer from './components/CenteredContainer';
import Footer from './components/Footer';

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />
      <Container>
        <Content>
          <CenteredContainer>
            <AppLogo to="/">Coronavirus Chile</AppLogo>
          </CenteredContainer>
          <Route exact path="/" component={Home} />
          <Route exact path="/regiones/:region" component={Region} />
          <Route exact path="/regiones/:region/comunas/:comuna" component={Comuna} />
        </Content>
        <Footer />
      </Container>
    </Router>
  </ThemeProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;

const AppLogo = styled(Link)`
  color: lightseagreen;
  font-size: 3em;
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-bottom: 6em;
`;
