import styled from 'styled-components';
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

export default {
  Container,
  Button,
};
