import React from 'react';
import {
  Overlay,
  Content,
  Title,
  TemplateOptions,
  NewTemplateButton,
  TemplateButton,
  CancelButton
} from './styledComponents.js';

const TemplateSelector = ({ onSelect, onCancel, savedTemplates }) => {
  return (
    <Overlay>
      <Content>
        <Title>Select Template</Title>
        <TemplateOptions>
          <NewTemplateButton onClick={() => onSelect(null)}>
            Create with New Template
          </NewTemplateButton>
          {savedTemplates.map((template, index) => (
            <TemplateButton key={index} onClick={() => onSelect(template)}>
              Create with "{template.jobTitle.label}" Template
            </TemplateButton>
          ))}
        </TemplateOptions>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </Content>
    </Overlay>
  );
};

export default TemplateSelector;