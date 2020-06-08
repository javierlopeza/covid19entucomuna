import React from 'react';
import ReactGA from 'react-ga';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

import theme from './styles/theme';
import GlobalStyle from './styles/global';

import Logo from './components/Logo';
import Home from './pages/Home';
import Region from './pages/Region';
import Commune from './pages/Commune';
import Rankings from './pages/Rankings';
import FAQ from './pages/FAQ';
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
        <ReactNotification />
        <Content>
          <CenteredContainer>
            <Logo />
          </CenteredContainer>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/regiones/:region" component={Region} />
            <Route exact path="/regiones/:region/comunas/:commune" component={Commune} />
            <Route exact path="/preguntas-frecuentes" component={FAQ} />
            <Route exact path="/rankings/:rankingName" component={Rankings} />
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer />
      </Container>
    </Router>
  </ThemeProvider>
);

export default process.env.NODE_ENV === 'development' ? hot(App) : App;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-bottom: 6em;
`;
