import styled from 'styled-components';

export const PreviewOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PreviewContent = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 5px;
  width: 60%;
  height: 60%;
  overflow-y: auto;
`;

export const PreviewJobPosting = styled.div`
  margin-top: 1rem;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;

export const Title = styled.h2`
  margin-top: 40px;
  text-align: center;
`;

export const Button = styled.button`
  padding: 5px;
  height: 45px;
  width: 170px;
  border-radius: 8px;
  border-width: 0px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #0099ff;
  color: white;

  &:hover {
    background-color: #0051ff;
  }
`;
