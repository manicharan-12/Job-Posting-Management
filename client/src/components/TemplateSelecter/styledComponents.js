import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  box-sizing: border-box;
`;

export const Content = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const TemplateOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
`;

export const TemplateButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const NewTemplateButton = styled(Button)`
  background-color: #3498db;
  color: white;

  &:hover {
    background-color: #2980b9;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #e74c3c;
  color: white;

  &:hover {
    background-color: #c0392b;
  }
`;