import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { formatValue } from '../utils/formatter';

const Row = (props) => {
  const { data, headers } = props;
  const rowValues = data.map((value, i) => {
    const key = `${data[0]}_${headers[i]}_${value}`;
    const formattedValue = _.isNumber(value) ? formatValue(value) : value;
    return <Td key={key}>{formattedValue}</Td>;
  });
  return <Tr>{rowValues}</Tr>;
};

const Table = (props) => {
  const { headers, data } = props;
  const headerRow = (
    <Tr>
      {headers.map(header => (
        <Th key={header}>{header}</Th>
      ))}
    </Tr>
  );
  const dataRows = data.map(row => (
    <Row key={row[0]} data={row} headers={headers} />
  ));
  return (
    <Container>
      <THead>{headerRow}</THead>
      <TBody>{dataRows}</TBody>
    </Container>
  );
};

export default Table;

const Container = styled.table`
  background-color: white;
  border-radius: 10px;
  border-collapse: collapse;
  ${({ theme }) => theme.baseShadow}
`;

const THead = styled.thead``;

const TBody = styled.tbody`
  tr:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.blue.normal};
  }
`;

const Tr = styled.tr`
  :hover {
    td, & + tr > td {
      border-color: transparent;
    }
  }
`;

const Th = styled.th`
  padding: 1em 2em;
  text-align: left;
  color: ${({ theme }) => theme.colors.blue.normal};
  font-weight: 400;
`;

const Td = styled.td`
  padding: 0.5em 2em;
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  text-align: right;

  :first-child {
    text-align: left;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  :last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;