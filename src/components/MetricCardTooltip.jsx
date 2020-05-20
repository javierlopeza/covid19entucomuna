import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const MetricCardTooltip = ({ children }) => (
  <Container>
    <Icon icon={faQuestionCircle} />
    <TextLimit>
      <Text>{children}</Text>
    </TextLimit>
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
  cursor: pointer;
  font-size: 0.8em;
  color: #bacbd7;

  :hover + div {
    display: flex;
  }
`;

const TextLimit = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  right: 1em;
  width: 9em;
  display: none;
  justify-content: flex-end;
`;

const Text = styled.div`
  background-color: white;
  border: 1px solid #bacbd7;
  border-radius: 3px;
  padding: 0.5em;
  font-size: 0.75em;
`;
