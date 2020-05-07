import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  position: relative;
`;

const Button = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 5px;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: white;
  ${({ theme }) => theme.baseShadow}

  color: #6b6b6b;
  font-size: 1em;
  font-weight: 200;

  transition: all 0.3s ease-in-out;

  @media (hover: hover) {
    background: linear-gradient(to left, white 50%, #5b78ff 50%);
    background-size: 201% 100%;
    background-position: right bottom;
    :hover {
      color: white;
      background-position: left bottom;
      transition: all 0.3s ease-in-out 0.2s;
    }
  }
`;

const QuarantineRibbon = styled.div`
  ${({ quarantine }) => !quarantine
    && css`
      display: none;
    `}

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

  :hover {
    width: 100px;
    color: white;
    transition: width 200ms ease-in-out, color 150ms ease-in-out 100ms;
  }

  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: -5px;
    background-color: #ff788f;
    width: 10px;
    height: 18px;
  }

  ::after {
    content: '';
    position: absolute;
    top: 18px;
    left: -5px;
    z-index: -1;
    background-color: #d45973;
    width: 5px;
    height: 15px;

    transform-origin: top left;
    transform: rotate(-45deg);
  }
`;

export default {
  Container,
  Button,
  QuarantineRibbon,
};
