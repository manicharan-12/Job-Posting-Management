import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 90%;
  width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 95%;
  }
`;

export const ProfileTitle = styled.h2`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

export const ProfileSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.2rem;
  border-bottom: 2px solid #3498db;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

export const InfoText = styled.p`
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

export const Link = styled.a`
  color: #3498db;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SkillItem = styled.li`
  background-color: #ecf0f1;
  color: #2c3e50;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

export const ApplicationHistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
`;

export const TableHeader = styled.th`
  background-color: #3498db;
  color: white;
  padding: 0.8rem;
  text-align: left;
`;

export const TableCell = styled.td`
  padding: 0.8rem;
  border-bottom: 1px solid #ecf0f1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-right:15px;
  &:hover {
    background-color: #2980b9;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ShortlistButton = styled(Button)`
  background-color: ${props => props.isShortlisted ? '#e74c3c' : '#2ecc71'};

  &:hover {
    background-color: ${props => props.isShortlisted ? '#c0392b' : '#27ae60'};
  }
`;

