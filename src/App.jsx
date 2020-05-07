import React from 'react';
import ReactGA from 'react-ga';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router, Route, Link, Switch, Redirect,
} from 'react-router-dom';

import theme from './styles/theme';
import GlobalStyle from './styles/global';

import Home from './pages/Home';
import Region from './pages/Region';
import Commune from './pages/Commune';
import CenteredContainer from './components/CenteredContainer';
import Footer from './components/Footer';

// Initialize Google Analytics
const trackingId = 'UA-91729603-2';
ReactGA.initialize(trackingId);

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <GlobalStyle />
      <Container>
        <Content>
          <CenteredContainer>
            <LogoContainer>
              <Logo to="/">COVID-19 en tu comuna</Logo>
            </LogoContainer>
          </CenteredContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/regiones/:region" component={Region} />
            <Route exact path="/regiones/:region/comunas/:commune" component={Commune} />
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer />
      </Container>
    </Router>
  </ThemeProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 1em 0;
  padding: 20px;
  width: 95%;
  @media ${theme.device.laptop} {
    width: 75%;
  }

  ${theme.baseShadow}
  background-color: ${theme.colors.red.normal};
  border-radius: 10px;
  text-align: center;
`;

const Logo = styled(Link)`
  color: white;
  font-weight: 400;
  font-size: 1.2em;
  @media ${theme.device.mobileM} {
    font-size: 1.45em;
  }
  @media ${theme.device.laptop} {
    font-size: 2em;
  }
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-bottom: 9.5em;
`;
