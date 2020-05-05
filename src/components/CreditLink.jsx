import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';
import { CATEGORIES, ACTIONS } from '../ga/events';

function handleCreditLinkClick(href) {
  ReactGA.event({
    category: CATEGORIES.CREDIT_LINK,
    action: ACTIONS.CLICK,
    label: href,
  });
  window.open(href, '_blank');
}

const CreditLink = ({ children, href }) => (
  <CreditLinkAnchor onClick={() => handleCreditLinkClick(href)}>
    {children}
  </CreditLinkAnchor>
);

const CreditLinkAnchor = styled.a`
  cursor: pointer;
  color: inherit;
  font-size: inherit;

  :hover {
    text-decoration: underline;
  }
`;

export default CreditLink;
