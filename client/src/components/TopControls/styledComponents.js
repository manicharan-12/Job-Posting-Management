import styled from 'styled-components';


export const TopControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 60%;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
    margin-right: 0;
  }
`;

export const JobStatus = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  width: 20%;
  margin-right: 20px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
    margin-right: 0;
  }
`;

export const CreateJobButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
  width: 15%;
  height:40px;
  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;