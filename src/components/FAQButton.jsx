import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const FAQButton = () => (
  <Container to="preguntas-frecuentes">
    <Icon icon={faQuestionCircle} />
  </Container>
);

export default FAQButton;

const Container = styled(Link)`
  display: flex;
  margin: 0.5em;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 0.8em;
  color: white;

  :hover + div {
    display: flex;
  }
`;
