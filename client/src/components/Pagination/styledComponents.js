import styled from 'styled-components';

export const PaginationContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
`;

export const PaginationButton = styled.button`
  margin: 0 5px;
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }

  &:hover:not(:disabled):not(.active) {
    background-color: #f0f2f5;
  }
`;

export const PaginationNumber = styled(PaginationButton)`
  &.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
  }
`;
