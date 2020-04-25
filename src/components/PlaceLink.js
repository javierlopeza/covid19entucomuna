import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PlaceLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: white;
`;

export default PlaceLink;
