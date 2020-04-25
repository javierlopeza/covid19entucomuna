import styled from 'styled-components';
import gridComunas from '../utils/gridComunas';

const PlacesContainer = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 30em) {
    grid-template-rows: repeat(${({ totalPlaces }) => gridComunas.rowsPerColumn(totalPlaces)}, 1fr);
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }
`;

export default PlacesContainer;
