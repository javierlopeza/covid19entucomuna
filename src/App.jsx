import React from 'react';
import { hot } from 'react-hot-loader/root';
import styled, { ThemeProvider, css } from 'styled-components';
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
            <LogoContainer>
              <Logo to="/">COVID-19 en tu comuna</Logo>
            </LogoContainer>
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

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0;
  box-sizing: border-box;
  width: 95%;
  ${({ theme: { device } }) => css`
    @media ${device.laptop} {
      width: 75%;
    }
    ${theme.baseShadow}
  `}
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Logo = styled(Link)`
  color: #ff788f;
  font-weight: 400;
  font-size: 1.25em;

  ${({ theme: { device } }) => css`
    @media ${device.mobileM} {
      font-size: 1.45em;
    }
    @media ${device.laptop} {
      font-size: 2em;
    }
  `}
`;

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-bottom: 6em;
`;
