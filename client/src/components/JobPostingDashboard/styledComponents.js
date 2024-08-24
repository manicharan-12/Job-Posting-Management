import styled from 'styled-components';

export const JobPostingManagement = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const JobPostingDashboardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
`;


export const NoJobsMessage = styled.div`
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #6c757d;
  font-style: italic;
`;

export const TemplateOptionsOverlay = styled.div`
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
`;

export const TemplateOptions = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;

  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
  }

  button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e0e0e0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;