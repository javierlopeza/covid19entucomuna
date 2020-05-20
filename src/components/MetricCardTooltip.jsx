import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const MetricCardTooltip = ({ children }) => (
  <Container>
    <Icon icon={faQuestionCircle} />
    {/* <Content>{children}</Content> */}
  </Container>
);

export default MetricCardTooltip;

const Container = styled.div`
  display: flex;
  margin: 0.3em;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 0.8em;
  color: #bacbd7;
`;

const Content = styled.div`
  position: absolute;
`;
