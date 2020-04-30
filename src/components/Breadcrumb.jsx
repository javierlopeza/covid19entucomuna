import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import _ from 'lodash';

const Container = ({ children }) => {
  const separatedChildren = children.length > 1 ? _.flatMap(children, (value, index, array) => (
    array.length - 1 !== index
      ? [value, <Separator label=">" />]
      : value
  )) : children;
  return (
    <MainContainer>
      {separatedChildren}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
  width: 95%;
`;

const Separator = styled.span`
  ::before {
    content: "${({ label }) => label}";
  }

  margin: 0 0.5em;
  font-size: 0.85em;
  font-weight: 400;
  color: #5b78ff;
`;

const Item = styled(Link)`
  font-size: 1.25em;
  font-weight: 400;
  color: #5b78ff;
  opacity: 0.6;
  text-align: center;
  margin: 0.1em;

  @media (hover) {    
    :hover {
      opacity: 1;
    }
  }
  :last-child {
    opacity: 1;
  }

  transition: all 100ms ease;
`;

export default {
  Container,
  Item,
};
