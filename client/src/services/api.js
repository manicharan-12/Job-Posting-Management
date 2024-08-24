import axios from "axios";

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiError = (error) => {
  console.error("API Error:", error);
  throw error;
};

export const submitJobPosting = async (jobPosting) => {
  try {
    const formattedJobPosting = {
      ...jobPosting,
      jobTitle: jobPosting.jobTitle.value || jobPosting.jobTitle,
      jobType: jobPosting.jobType.map(type => type.value || type),
      department: jobPosting.department.value || jobPosting.department,
      jobLevel: jobPosting.jobLevel.value || jobPosting.jobLevel,
      technicalSkills: jobPosting.technicalSkills.map(skill => skill.value || skill),
      languagesRequired: jobPosting.languagesRequired.map(lang => lang.value || lang),
      salaryRange: {
        ...jobPosting.salaryRange,
        currency: jobPosting.salaryRange.currency.value || jobPosting.salaryRange.currency,
        formatted: `${jobPosting.salaryRange.currency.value || jobPosting.salaryRange.currency} ${jobPosting.salaryRange.min}-${jobPosting.salaryRange.max}`
      }
    };
    const response = await api.post("/job-postings", formattedJobPosting);
    return response.data;
  } catch (error) {
    console.error("Error submitting job posting:", error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Failed to create job posting");
    }
  }
};

export const getAllJobPosting = async () => {
  try {
    const response = await api.get("/job-postings");
    return response.data;
  } catch (error) {
    handleApiError({ error: "Failed to fetch job" });
    return [];
  }
};

export const deleteJobPosting = async (id) => {
  try {
    const response = await api.delete(`/job-postings/${id}`);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to delete job Posting" });
  }
};

export const duplicateJobPosting = async (id) => {
  try {
    const response = await api.post(`/job-postings/${id}/duplicate`);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to duplicate job Posting" });
  }
};

export const updateJobPosting = async (id, jobPosting) => {
  try {
    const response = await api.put(`/job-postings/${id}`, jobPosting);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to update job Posting" });
  }
};

// Add these functions to your api.js file

export const createAuditTrailEntry = async (auditEntry) => {
  try {
    const response = await api.post("/audit-trail", auditEntry);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to create audit trail entry" });
  }
};

export const getAuditTrailForJob = async (jobId) => {
  try {
    const response = await api.get(`/audit-trail/${jobId}`);
    return response.data;
  } catch (error) {
    return handleApiError({ error: "Failed to fetch audit trail entries" });
  }
};