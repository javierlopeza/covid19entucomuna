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
  ${({ theme }) => theme.baseShadow}
  
  color: #6b6b6b;
  font-weight: 200;

  background: linear-gradient(to left, white 50%, #5b78ff 50%);
  background-size: 201% 100%;
  background-position: right bottom;
  
  transition: all 0.3s ease-in-out 0.2s;

  &:hover {
    color: white;
    background-position: left bottom;
  }
`;

export default PlaceLink;
