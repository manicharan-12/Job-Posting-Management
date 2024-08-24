const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobLocation: [
    {
      value: { type: String, required: true },
      label: { type: String, required: true },
    },
  ],
  jobType: [{ type: String, required: true }],
  department: { type: String, required: true },
  jobLevel: { type: String, required: true },
  salaryRange: {
    currency: { type: String, required: true },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    isVisible: { type: Boolean, required: true },
    formatted: { type: String },
  },
  jobDescription: { type: String, required: true },
  jobResponsibilities: { type: String, required: true },
  keySkillsRequired: { type: String, required: true },
  preferredQualifications: { type: String, required: true },
  minimumExperienceRequired: { type: String, required: true },
  educationRequirements: { type: String, required: true },
  certificationsRequired: String,
  companyName: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  companyLogo: String,
  companySize: String,
  companyLocation: { type: Object, required: true },
  applicationDeadline: { type: Date, required: true },
  recruiterName: { type: String, required: true },
  recruiterNameVisible: { type: Boolean, required: true },
  recruiterContactEmail: String,
  recruiterContactPhoneNumber: String,
  technicalSkills: [{ type: String, required: true }],
  languagesRequired: [{ type: String, required: true }],
  benefitsAndPerks: String,
  workingHours: String,
  interviewProcessDescription: String,
  backgroundCheckRequirements: String,
  status: { type: String, default: "active" },
  customFields: { type: Object },
  linkToApply: { type: String, required: true },
});

module.exports = mongoose.model("JobPosting", jobPostingSchema);
