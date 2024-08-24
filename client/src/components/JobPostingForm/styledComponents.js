import styled from 'styled-components';
import Select from 'react-select';

export const PopupOverlay = styled.div`
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

export const PopupContent = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const JobPostingFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

export const CheckboxContainer = styled.label`
  display: flex;
  align-items: flex-start;
  margin-left:auto;

  font-weight: 300;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

export const SalaryRange = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const CustomField = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  input {
    flex: 1;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Button = styled.button`
  padding: 5px;
  height: 45px;
  width: 170px;
  border-radius: 8px;
  border-width: 0px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

export const SubmitButton = styled(Button)`
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

export const ActionButton = styled(Button)`
  background-color: #0099ff;
  color: white;

  &:hover {
    background-color: #0051ff;
  }
`;

export const ReactSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#4CAF50 !important' : '#ccc !important',
    '&:hover': {
      borderColor: '#aaa !important',
    },
    boxShadow: state.isFocused ? '0 0 0 1px #4CAF50 !important' : 'none',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#4CAF50 !important' : 'white',
    '&:hover': {
      backgroundColor: '#e8f5e9 !important',
    },
  }),
};

export const ApplicationDeadlineInput = styled(Input)`
  width: 90% !important;
`;

export const Star = styled.span`
  color: #ff3c00;
`;

export const SalaryInputField = styled.div`
  margin-bottom: 20px;
`;

export const SalaryLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const SalaryRangeContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const CurrencySelect = styled(Select)`
  min-width: 20%;
`;

export const SalaryInput = styled.input`
  min-width: 30%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SalaryCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

export const SalaryCheckbox = styled.input`
  margin-right: 5px;
`;

export const SalaryCheckboxLabel = styled.label`
  font-size: 14px;
`;
