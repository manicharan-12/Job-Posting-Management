// TemplateSelector.js

import React from "react";
import {
  Overlay,
  Content,
  Title,
  TemplateOptions,
  NewTemplateButton,
  TemplateButton,
  DeleteButton,
  CancelButton,
} from "./styledComponents.js";

const TemplateSelector = ({ onSelect, onCancel, savedTemplates, onDeleteTemplate }) => {
  return (
    <Overlay>
      <Content>
        <Title>Select Template</Title>
        <TemplateOptions>
          <NewTemplateButton onClick={() => onSelect(null)}>
            Create with New Template
          </NewTemplateButton>
          {savedTemplates.map((template) => (
            <div key={template._id}>
              <TemplateButton onClick={() => onSelect(template)}>
                Create with "{template.name}" Template
              </TemplateButton>
              <DeleteButton onClick={() => onDeleteTemplate(template._id)}>
                Delete
              </DeleteButton>
            </div>
          ))}
        </TemplateOptions>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </Content>
    </Overlay>
  );
};

export default TemplateSelector;