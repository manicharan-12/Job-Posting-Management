import styled from 'styled-components';

export const AuditTrailContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 40px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 600px) {
    font-size: 0.8em;
  }
`;

export const TableHead = styled.thead`
  th {
    background-color: #f8f8f8;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.85em;
    color: #666;
  }
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;

  @media screen and (max-width: 600px) {
    padding: 8px 10px;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;
