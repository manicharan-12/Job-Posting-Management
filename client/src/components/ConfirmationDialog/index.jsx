import React from 'react';
import { ConfirmationMessage, ConfirmationButton, ConfirmationPara } from './styledComponents.js';

const ConfirmationDialog = ({ show, onClose, onCreateAnother }) => {
  if (!show) return null;

  return (
    <ConfirmationMessage>
      <ConfirmationPara>Success!!!</ConfirmationPara>
      <div>
        <ConfirmationButton onClick={onCreateAnother}>Create Another Job</ConfirmationButton>
        <ConfirmationButton onClick={onClose}>Close</ConfirmationButton>
      </div>
    </ConfirmationMessage>
  );
};

export default ConfirmationDialog;