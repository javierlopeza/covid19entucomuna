import styled from 'styled-components';

const BoxTitle = styled.h1`
    color: ${({ warning }) => (warning ? '#ff788f' : '#7c97fc')};
    font-weight: 400;
    text-align: center;
`;

export default BoxTitle;
