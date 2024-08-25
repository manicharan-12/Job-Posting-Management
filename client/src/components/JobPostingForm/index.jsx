import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import languageData from "../data/language.json";
import { useForm, Controller } from "react-hook-form";
import skillsData from "../data/skills.json";
import departmentOptions from "../data/departments.js";
import {
  PopupOverlay,
  PopupContent,
  JobPostingFormContainer,
  InputField,
  Label,
  Input,
  TextArea,
  CheckboxContainer,
  SalaryInput,
  CustomField,
  FormActions,
  SubmitButton,
  ActionButton,
  Star,
  SalaryInputField,
  SalaryLabel,
  SalaryRangeContainer,
  SalaryCheckboxContainer,
  SalaryCheckbox,
  SalaryCheckboxLabel,
  CurrencySelect,
} from "./styledComponents.js";

const technicalSkillsOptions = skillsData.map(({ name }) => ({
  value: name,
  label: name,
}));
const languageOptions = languageData.map(({ name }) => ({
  value: name,
  label: name,
}));

const initialJobPosting = {
  jobTitle: null,
  jobLocation: [],
  jobType: [],
  department: "",
  jobLevel: "",
  salaryRange: { currency: "USD", min: "", max: "", isVisible: true },
  jobDescription: "",
  jobResponsibilities: "",
  keySkillsRequired: "",
  preferredQualifications: "",
  minimumExperienceRequired: "",
  educationRequirements: "",
  certificationsRequired: "",
  companyName: "",
  companyWebsite: "",
  companyLogo: "",
  companySize: "",
  companyLocation: null,
  applicationDeadline: "",
  recruiterName: "",
  recruiterNameVisible: true,
  recruiterContactEmail: "",
  recruiterContactPhoneNumber: "",
  technicalSkills: [],
  languagesRequired: [],
  benefitsAndPerks: "",
  workingHours: "",
  interviewProcessDescription: "",
  backgroundCheckRequirements: "",
  status: "active",
  customFields: [],
  linkToApply: "",
};

const JobPostingForm = (props) => {
  const {
    onSubmit,
    onPreview,
    onClose,
    jobOptions,
    cities,
    currencies,
    editingJob,
    template,
    onSaveTemplate,
    setIsPopupOpen,
    setShowConfirmation,
  } = props;

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: template || initialJobPosting,
  });

  const [customFields, setCustomFields] = useState([]);

  useEffect(() => {
    if (editingJob) {
      Object.entries(editingJob).forEach(([key, value]) =>
        setValue(key, value)
      );
      setCustomFields(
        Array.isArray(editingJob.customFields) ? editingJob.customFields : []
      );
    }
  }, [editingJob, setValue]);

  const handleSaveTemplate = () => {
    const currentValues = watch();
    if (!currentValues.jobTitle) {
      alert("Please fill all mandatory fields!");
      return;
    }

    const templateToSave = {
      name: currentValues.jobTitle.label || currentValues.jobTitle,
      content: {
        ...currentValues,
        customFields,
      },
    };

    onSaveTemplate(templateToSave);

    setIsPopupOpen(false);
    setShowConfirmation(true);
  };

  const loadCityOptions = useCallback(
    (inputValue, callback) => {
      setTimeout(() => {
        const filteredCities = cities
          .filter((city) =>
            city.city_name.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 100)
          .map((city) => ({ value: city.city_id, label: city.city_name }));
        callback(filteredCities);
      }, 300);
    },
    [cities]
  );

  const handleCustomFieldChange = (index, field, value) => {
    setCustomFields((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const onSubmitForm = async (data) => {
    if (
      !data.jobTitle ||
      data.jobLocation.length === 0 ||
      !data.companyName ||
      !data.companyWebsite ||
      !data.linkToApply ||
      !data.applicationDeadline
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formattedJobPosting = {
      ...data,
      applicationDeadline: data.applicationDeadline,
      salaryRange: {
        ...data.salaryRange,
        currency: data.salaryRange.currency.value || data.salaryRange.currency,
        formatted: `${
          data.salaryRange.currency.value || data.salaryRange.currency
        } ${data.salaryRange.min || "0"}-${data.salaryRange.max || "0"}`,
      },
      customFields: customFields.reduce((acc, { key, value, isMandatory }) => {
        if (key && value) acc[key] = { value, isMandatory };
        return acc;
      }, {}),
    };
    onSubmit(formattedJobPosting);
  };

  const handlePreview = () => {
    const currentValues = watch();
    if (
      !currentValues.jobTitle ||
      currentValues.jobLocation.length === 0 ||
      !currentValues.companyName ||
      !currentValues.companyWebsite ||
      !currentValues.linkToApply
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const previewJobPosting = {
      ...currentValues,
      salaryRange: `${currentValues.salaryRange.currency} ${currentValues.salaryRange.min}-${currentValues.salaryRange.max}`,
      customFields: customFields.reduce((acc, { key, value, isMandatory }) => {
        if (key && value) acc[key] = { value, isMandatory };
        return acc;
      }, {}),
    };
    onPreview(previewJobPosting);
  };

  const renderField = (
    name,
    label,
    type = "text",
    options = null,
    isMulti = false,
    isRequired = false
  ) => (
    <Controller
      name={name}
      control={control}
      rules={{ required: isRequired }}
      render={({ field }) => (
        <InputField>
          <Label>
            {label}
            {isRequired && <Star>*</Star>}
          </Label>
          {type === "select" ? (
            <Select
              {...field}
              options={options}
              isMulti={isMulti}
              placeholder={`Select ${label}`}
            />
          ) : type === "textarea" ? (
            <TextArea {...field} placeholder={label} />
          ) : type === "datetime-local" ? (
            <Input
              {...field}
              type={type}
              placeholder={label}
              min={new Date().toISOString().slice(0, 16)}
            />
          ) : (
            <Input {...field} type={type} placeholder={label} />
          )}
        </InputField>
      )}
    />
  );

  return (
    <PopupOverlay>
      <PopupContent>
        <h2>{editingJob ? "Edit Job Posting" : "Create New Job Posting"}</h2>
        <JobPostingFormContainer onSubmit={handleSubmit(onSubmitForm)}>
          {renderField(
            "jobTitle",
            "Job Title",
            "select",
            jobOptions,
            false,
            true
          )}
          <Controller
            name="jobLocation"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputField>
                <Label>
                  Job Locations<Star>*</Star>
                </Label>
                <AsyncSelect
                  {...field}
                  isMulti
                  loadOptions={loadCityOptions}
                  placeholder="Search and select cities..."
                  noOptionsMessage={() => "Type to search cities"}
                />
              </InputField>
            )}
          />
          {renderField(
            "jobType",
            "Job Type",
            "select",
            [
              { value: "Full-Time", label: "Full-Time" },
              { value: "Part-Time", label: "Part-Time" },
              { value: "Contract", label: "Contract" },
              { value: "Temporary", label: "Temporary" },
              { value: "Internship", label: "Internship" },
            ],
            true,
            true
          )}
          {renderField(
            "department",
            "Department",
            "select",
            departmentOptions,
            false,
            true
          )}
          {renderField(
            "jobLevel",
            "Job Level",
            "select",
            [
              { value: "Entry-Level", label: "Entry-Level" },
              { value: "Mid-Level", label: "Mid-Level" },
              { value: "Senior-Level", label: "Senior-Level" },
              { value: "Executive", label: "Executive" },
              { value: "Managerial", label: "Managerial" },
            ],
            false,
            true
          )}

          <SalaryInputField>
            <SalaryLabel>Salary Range (Annual CTC)</SalaryLabel>
            <SalaryRangeContainer>
              <Controller
                name="salaryRange.currency"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CurrencySelect
                    {...field}
                    options={currencies.map((curr) => ({
                      value: curr,
                      label: curr,
                    }))}
                    placeholder="Currency"
                  />
                )}
              />
              <Controller
                name="salaryRange.min"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SalaryInput
                    {...field}
                    type="number"
                    placeholder="Min Salary"
                  />
                )}
              />
              <Controller
                name="salaryRange.max"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SalaryInput
                    {...field}
                    type="number"
                    placeholder="Max Salary"
                  />
                )}
              />
            </SalaryRangeContainer>
            <SalaryCheckboxContainer>
              <Controller
                name="salaryRange.isVisible"
                control={control}
                render={({ field }) => (
                  <>
                    <SalaryCheckbox
                      type="checkbox"
                      {...field}
                      checked={field.value}
                      id="salaryVisibility"
                    />
                    <SalaryCheckboxLabel htmlFor="salaryVisibility">
                      Visible to candidates
                    </SalaryCheckboxLabel>
                  </>
                )}
              />
            </SalaryCheckboxContainer>
          </SalaryInputField>

          {renderField(
            "applicationDeadline",
            "Application Deadline",
            "datetime-local",
            null,
            false,
            true
          )}

          {renderField(
            "jobDescription",
            "Job Description",
            "textarea",
            null,
            false,
            true
          )}
          {renderField(
            "jobResponsibilities",
            "Job Responsibilities",
            "textarea",
            null,
            false,
            true
          )}
          {renderField(
            "keySkillsRequired",
            "Key Skills Required",
            "textarea",
            null,
            false,
            true
          )}
          {renderField(
            "preferredQualifications",
            "Preferred Qualifications",
            "textarea",
            null,
            false,
            true
          )}
          {renderField(
            "minimumExperienceRequired",
            "Minimum Experience Required",
            "text",
            null,
            false,
            true
          )}
          {renderField(
            "educationRequirements",
            "Education Requirements",
            "text",
            null,
            false,
            true
          )}
          {renderField(
            "certificationsRequired",
            "Certifications Required",
            "textarea"
          )}

          <h2>Company Details</h2>
          {renderField(
            "companyName",
            "Company Name",
            "text",
            null,
            false,
            true
          )}
          {renderField(
            "companyWebsite",
            "Company Website",
            "url",
            null,
            false,
            true
          )}
          {renderField("companyLogo", "Company Logo URL", "url")}
          {renderField("companySize", "Company Size", "select", [
            { value: "1-10", label: "1-10 employees" },
            { value: "11-50", label: "11-50 employees" },
            { value: "51-200", label: "51-200 employees" },
            { value: "201-500", label: "201-500 employees" },
            { value: "501-1000", label: "501-1000 employees" },
            { value: "1001+", label: "1001+ employees" },
          ])}
          <Controller
            name="companyLocation"
            control={control}
            render={({ field }) => (
              <InputField>
                <Label>
                  Company Location (Head Quarters)<Star>*</Star>
                </Label>
                <AsyncSelect
                  {...field}
                  loadOptions={loadCityOptions}
                  placeholder="Company Location..."
                  noOptionsMessage={() => "Type to search cities"}
                  required
                />
              </InputField>
            )}
          />

          <h2>Contact Information</h2>
          <InputField>
            <Label>
              Recruiter Name<Star>*</Star>
            </Label>
            <InputField>
              <Controller
                name="recruiterName"
                control={control}
                render={({ field }) => (
                  <Input {...field} type="text" placeholder="Recruiter Name" />
                )}
              />
              <Controller
                name="recruiterNameVisible"
                control={control}
                render={({ field }) => (
                  <CheckboxContainer>
                    <Input type="checkbox" {...field} checked={field.value} />
                    Visible to candidates
                  </CheckboxContainer>
                )}
              />
            </InputField>
          </InputField>
          {renderField(
            "recruiterContactEmail",
            "Recruiter Contact Email",
            "email"
          )}
          {renderField(
            "recruiterContactPhoneNumber",
            "Recruiter Contact Phone Number",
            "tel"
          )}

          <h2>Job Requirements</h2>
          {renderField(
            "technicalSkills",
            "Technical Skills (Good to Have)",
            "select",
            technicalSkillsOptions,
            true,
            true
          )}
          {renderField(
            "languagesRequired",
            "Languages Required",
            "select",
            languageOptions,
            true,
            true
          )}

          <h2>Additional Information</h2>
          {renderField("benefitsAndPerks", "Benefits and Perks", "textarea")}
          {renderField("workingHours", "Working Hours")}
          {renderField(
            "interviewProcessDescription",
            "Interview Process Description",
            "textarea"
          )}
          {renderField(
            "backgroundCheckRequirements",
            "Background Check Requirements",
            "textarea"
          )}
          {renderField(
            "linkToApply",
            "Link to Apply",
            "url",
            null,
            false,
            true
          )}

          <InputField>
            <Label>Custom Fields</Label>
            {Array.isArray(customFields) &&
              customFields.map((field, index) => (
                <CustomField key={index}>
                  <Input
                    type="text"
                    placeholder="Field Name"
                    value={field.key}
                    onChange={(e) =>
                      handleCustomFieldChange(index, "key", e.target.value)
                    }
                  />
                  <Input
                    type="text"
                    placeholder="Field Value"
                    value={field.value}
                    onChange={(e) =>
                      handleCustomFieldChange(index, "value", e.target.value)
                    }
                  />
                  <CheckboxContainer>
                    <Input
                      type="checkbox"
                      checked={field.isMandatory}
                      onChange={(e) =>
                        handleCustomFieldChange(
                          index,
                          "isMandatory",
                          e.target.checked
                        )
                      }
                    />
                    Mandatory
                  </CheckboxContainer>
                  <ActionButton
                    type="button"
                    onClick={() =>
                      setCustomFields((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                  >
                    Remove
                  </ActionButton>
                </CustomField>
              ))}
            <ActionButton
              type="button"
              onClick={() =>
                setCustomFields((prev) => [
                  ...prev,
                  { key: "", value: "", isMandatory: false },
                ])
              }
            >
              Add Custom Field
            </ActionButton>
          </InputField>

          <FormActions>
            <SubmitButton>
              {editingJob ? "Update Job Posting" : "Create Job Posting"}
            </SubmitButton>
            {!template && (
              <ActionButton type="button" onClick={handleSaveTemplate}>
                Save Template
              </ActionButton>
            )}
            <ActionButton type="button" onClick={handlePreview}>
              Preview
            </ActionButton>
            <ActionButton type="button" onClick={onClose}>
              Cancel
            </ActionButton>
          </FormActions>
        </JobPostingFormContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default JobPostingForm;
