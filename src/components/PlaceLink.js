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
  
  transition: all 0.15s ease-in-out;

  &:hover {
    -webkit-box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
    box-shadow: 0px 2px 5px rgba(0,0,0,0.3);
    color: #25343f;
  }
`;

export default PlaceLink;
