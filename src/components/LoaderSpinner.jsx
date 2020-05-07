import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const LoaderSpinner = () => (
  <Container>
    <Loader
      type="Audio"
      color="#a9beff"
      height={50}
      width={50}
    />
    <Text>Cargando últimos datos...</Text>
  </Container>
);

export default LoaderSpinner;

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray.normal};
`;
