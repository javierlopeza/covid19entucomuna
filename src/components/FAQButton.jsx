import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

class FAQButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showText: false });
    }, 3000);
  }

  render() {
    const { showText } = this.state;
    return (
      <Container to="preguntas-frecuentes">
        <Text show={showText}>Preguntas Frecuentes</Text>
        <Icon icon={faQuestionCircle} />
      </Container>
    );
  }
}

export default FAQButton;

const Container = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.5em;
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Text = styled.div`
  z-index: 1;
  font-size: 0.75em;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.red.normal};
  overflow: hidden;

  background-color: white;
  border-radius: 0.75em;
  padding: 0.25em 0.5em;
  width: 11em;
  white-space: nowrap;

  ${({ show }) => !show
    && css`
      opacity: 0;
      width: 0.5em;
      transition: opacity 25ms linear 325ms, width 400ms ease-in-out;
    `}

  :hover {
    opacity: 1;
    width: 11em;
    transition: opacity 25ms linear, width 300ms ease-out;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;

  cursor: pointer;
  font-size: 1.1em;
  color: white;

  :hover + div {
    display: flex;
  }
`;
