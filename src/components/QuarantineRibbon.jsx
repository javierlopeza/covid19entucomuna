import React from 'react';
import styled from 'styled-components';

const QuarantineRibbon = ({ text, show }) => (show ? (
  <Container>
    <LeftSegment />
    <TextArea id="text">{text}</TextArea>
    <BackSegment />
  </Container>
) : (
  <></>
));

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
  width: 15px;
  line-height: 18px;

  cursor: default;
  font-size: 0.6em;
  font-weight: 400;
  color: transparent;
  background-color: #ff788f;
  border-radius: 3px;
  text-align: center;
  white-space: nowrap;

  transition: width 200ms ease-in-out, color 100ms ease-in-out;
`;

const LeftSegment = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
  width: 10px;
  height: 18px;
  background-color: #ff788f;
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
