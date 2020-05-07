import styled from 'styled-components';
import gridCommunes from '../utils/gridCommunes';

const PlacesContainer = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 30em) {
    grid-template-rows: repeat(${({ totalPlaces }) => gridCommunes.rowsPerColumn(totalPlaces)}, 1fr);
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
  }
`;

export default PlacesContainer;
