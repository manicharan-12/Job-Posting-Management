import styled from 'styled-components';


export const ConfirmationMessage = styled.div`
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
  text-align: center;
`;

export const ConfirmationPara = styled.p`
  color: #155724;
  margin-bottom: 10px;
`;

export const ConfirmationButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 0 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;