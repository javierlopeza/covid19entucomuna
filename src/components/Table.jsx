import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { formatValue, formatDeltaValue } from '../utils/formatter';


const Row = (props) => {
  const history = useHistory();
  const { data, path } = props;
  const rowValues = _.toPairs(data).map(([header, value]) => {
    const key = `${data.comuna}_${header}_${value}`;
    const isNumber = _.isNumber(value);
    let formattedValue = isNumber ? formatValue(value) : value;
    const isChange = _.includes(header, 'delta');
    if (isChange) {
      formattedValue = formatDeltaValue(formattedValue);
    }
    return <Td key={key}>{formattedValue}</Td>;
  });
  return <Tr onClick={() => history.push(path)}>{rowValues}</Tr>;
};

const Table = (props) => {
  const {
    headers,
    rows,
    footerText,
  } = props;
  const headerRow = (
    <Tr>
      {headers.map(header => (
        <Th key={header}>{header}</Th>
      ))}
    </Tr>
  );
  const dataRows = rows.map(({ data, path }) => (
    <Row key={data.comuna} data={data} path={path} />
  ));
  const footer = (
    <Tr>
      <Footer colSpan="100">{footerText}</Footer>
    </Tr>
  );
  return (
    <Container>
      <THead>{headerRow}</THead>
      <TBody>
        {dataRows}
        {footerText && footer}
      </TBody>
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

const TBody = styled.tbody``;

const Tr = styled.tr`
  @media (hover: hover) {
    :hover:not(:last-child) {
      cursor: pointer;
      color: white;
      background-color: ${({ theme }) => theme.colors.blue.normal};

      td,
      & + tr > td {
        border-color: transparent;
      }
    }
  }
`;

const Th = styled.th`
  color: ${({ theme }) => theme.colors.blue.normal};
  font-weight: 400;
  text-align: center;
  line-height: 1.2em;
  max-width: 5em;

  padding: 0.75em 0.75em 0.75em 0;
  :first-child {
    padding-left: 0.75em;
  }

  @media ${({ theme }) => theme.device.mobileL} {
    padding: 1em 2em 1em 0;
    :first-child {
      padding-left: 2em;
    }
  }

  font-size: 0.85em;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 0.9em;
  }
`;

const Td = styled.td`
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  text-align: center;
  line-height: 1.2em;
  max-width: 10em;

  padding: 0.5em 0.75em 0.5em 0;
  :first-child {
    padding-left: 0.75em;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  :last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  @media ${({ theme }) => theme.device.mobileL} {
    padding: 0.5em 2em 0.5em 0;
    :first-child {
      padding-left: 2em;
    }
  }

  font-size: 0.85em;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 0.9em;
  }
`;

const Footer = styled.td`
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  padding: 0.75em 0.75em;
  color: ${({ theme }) => theme.colors.blue.normal};
  text-align: center;
  font-weight: 200;
  font-size: 0.7em;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 0.8em;
  }
`;
