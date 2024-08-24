import styled from 'styled-components';

export const JobPostingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #2c3e50;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const CompanyCell = styled.td`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

export const CompanyLogo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`;

export const CompanyName = styled.span`
  font-weight: bold;
`;

export const StatusSelect = styled.select`
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  max-width: 120px;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #7f8c8d;
  transition: color 0.3s;
  padding: 5px;

  &:hover {
    color: #34495e;
  }

  @media (max-width: 768px) {
    padding: 5px;
  }
`;
