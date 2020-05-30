import React, { Component } from 'react';
import styled, { css } from 'styled-components';

class QuarantineRibbon extends Component {
  constructor(props) {
    super(props);
    this.state = { explained: false };
  }

  startTimeoutExplanation() {
    setTimeout(() => {
      this.setState({ explained: true });
    }, 3000);
  }

  render() {
    const { text, isVisible } = this.props;
    const { explained } = this.state;
    if (isVisible && !explained) {
      this.startTimeoutExplanation();
    }
    return (
      <Container className="quarantineRibbon">
        <LeftSegment />
        <TextArea id="text" explain={isVisible && !explained}>
          {text}
        </TextArea>
        <BackSegment />
      </Container>
    );
  }
}

export default QuarantineRibbon;

const Container = styled.div`
  position: absolute;
  z-index: 1;
  border-left: 30px solid transparent;
  left: -30px;
  height: 35px;
  width: 50px;

  :hover > div#text {
    width: 100px;
    color: white;
    transition: width 200ms ease-in-out, color 150ms ease-in-out 100ms;
  }
`;

const TextArea = styled.div`
  position: absolute;
  top: -3px;
  left: 3px;
  line-height: 18px;

  cursor: default;
  font-size: 0.6em;
  font-weight: 400;
  background-color: ${({ theme }) => theme.colors.red.normal};
  border-radius: 3px;
  text-align: center;
  white-space: nowrap;

  ${({ explain }) => (!explain
    ? css`
          width: 15px;
          color: transparent;
          transition: width 200ms ease-in-out, color 100ms ease-in-out;
        `
    : css`
          width: 100px;
          color: white;
          transition: width 200ms ease-in-out, color 150ms ease-in-out 100ms;
        `)}
`;

const LeftSegment = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
  width: 10px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.red.normal};
`;

const BackSegment = styled.div`
  position: absolute;
  top: 15px;
  left: -3px;
  width: 0;
  height: 0;
  border: 5.5px solid;
  border-color: transparent transparent transparent #d45973;
  transform-origin: top left;
  transform: rotate(-45deg);
`;
