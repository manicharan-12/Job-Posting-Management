import React, { useState, useEffect } from "react";
import cityData from "../data/cities.json";
import jobList from "../data/jobRoles.json";
import currencyData from "../data/currencies.json";
import JobPostingForm from "../JobPostingForm";
import JobPostingPreview from "../JobPostingPreview";
import AuditTrail from "../AuditTrail";
import TemplateSelector from "../TemplateSelecter";
import TopControls from "../TopControls";
import JobPostingsTable from "../JobPostingsTable";
import Pagination from "../Pagination";
import ConfirmationDialog from "../ConfirmationDialog";
import {
  JobPostingManagement,
  JobPostingDashboardContainer,
  Title,
} from "./styledComponents.js";
import {
  getAllJobPosting,
  deleteJobPosting,
  duplicateJobPosting,
  submitJobPosting,
  updateJobPosting,
  createAuditTrailEntry,
  getAuditTrailForJob,
} from "../../services/api";

const cities = cityData[2].data;
const currencies = currencyData.map((cur) => cur.code);

const JobPostingDashboard = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [previewJobPosting, setPreviewJobPosting] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [auditTrail, setAuditTrail] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateWithTemplate, setIsCreateWithTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchJobPostingsAndAuditTrail = async () => {
      try {
        const [jobPostingsResponse, auditTrailResponse] = await Promise.all([
          getAllJobPosting(),
          getAuditTrailForJob("all"),
        ]);
        setJobPostings(jobPostingsResponse);
        setAuditTrail(auditTrailResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchJobPostingsAndAuditTrail();
  }, []);

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await getAllJobPosting();
        setJobPostings(response);
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
    };
    fetchJobPostings();
  }, [jobPostings]);

  useEffect(() => {
    const fetchAuditTrail = async () => {
      try {
        const auditTrailResponse = await getAuditTrailForJob("all");
        setAuditTrail(auditTrailResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAuditTrail();
  }, [auditTrail]);

  const handlePreviewJobPosting = (jobPosting) => {
    setPreviewJobPosting(jobPosting);
  };

  const handleClosePreview = () => {
    setPreviewJobPosting(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Find the job posting to update
      const jobToUpdate = jobPostings.find((posting) => posting._id === id);

      if (!jobToUpdate) {
        console.error("Job posting not found");
        return;
      }

      // Create an updated job posting object with the new status
      const updatedJobPosting = {
        ...jobToUpdate,
        status: newStatus,
      };

      // Call the API to update the job posting
      const response = await updateJobPosting(id, updatedJobPosting);

      // Update the local state with the updated job posting
      setJobPostings((prev) =>
        prev.map((posting) =>
          posting._id === id ? response.jobPosting : posting
        )
      );

      // Add to audit trail
      await addToAuditTrail(
        id,
        "Status Change",
        `Status changed to ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating job posting status:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  const handleDeletePosting = async (id) => {
    try {
      await deleteJobPosting(id);
      setJobPostings((prev) => prev.filter((posting) => posting._id !== id));
      addToAuditTrail(id, "Deletion", "Job posting deleted");
      setPreviewJobPosting(null);
    } catch (error) {
      console.error("Error deleting job posting:", error);
    }
  };

  const handleDuplicatePosting = async (posting) => {
    try {
      const response = await duplicateJobPosting(posting._id);
      const duplicatedPosting = response.jobPosting;
      setJobPostings((prev) => [...prev, duplicatedPosting]);
      addToAuditTrail(
        duplicatedPosting._id,
        "Duplication",
        `Duplicated from job posting ${posting._id}`
      );
    } catch (error) {
      console.error("Error duplicating job posting:", error);
    }
  };

  const handleCreateJobPosting = async (newJobPosting, isDraft = false) => {
    try {
      const jobPostingWithStatus = {
        ...newJobPosting,
        status: isDraft ? "draft" : "active",
      };

      // Ensure required fields are present
      if (
        !jobPostingWithStatus.jobTitle ||
        !jobPostingWithStatus.jobType ||
        jobPostingWithStatus.jobType.length === 0 ||
        !jobPostingWithStatus.department ||
        !jobPostingWithStatus.jobLevel ||
        !jobPostingWithStatus.salaryRange.currency ||
        !jobPostingWithStatus.technicalSkills ||
        jobPostingWithStatus.technicalSkills.length === 0 ||
        !jobPostingWithStatus.languagesRequired ||
        jobPostingWithStatus.languagesRequired.length === 0
      ) {
        throw new Error("Please fill in all required fields");
      }

      const response = await submitJobPosting(jobPostingWithStatus);
      const createdJobPosting = response.jobPosting;
      setJobPostings((prev) => [createdJobPosting, ...prev]);
      setIsPopupOpen(false);
      setShowConfirmation(true);
      addToAuditTrail(
        createdJobPosting._id,
        "Creation",
        `New job posting ${isDraft ? "saved as draft" : "published"}`
      );
    } catch (error) {
      console.error("Error creating job posting:", error);
      // Show an error message to the user
      alert(error.message || "Failed to create job posting. Please try again.");
    }
  };

  const handleEditJobPosting = async (updatedJobPosting, isDraft = false) => {
    try {
      const editedPosting = {
        ...updatedJobPosting,
        status: isDraft ? "draft" : updatedJobPosting.status,
        jobTitle:
          updatedJobPosting.jobTitle.value || updatedJobPosting.jobTitle,
        jobType: updatedJobPosting.jobType.map((type) => type.value || type),
        department:
          updatedJobPosting.department.value || updatedJobPosting.department,
        jobLevel:
          updatedJobPosting.jobLevel.value || updatedJobPosting.jobLevel,
        technicalSkills: updatedJobPosting.technicalSkills.map(
          (skill) => skill.value || skill
        ),
        languagesRequired: updatedJobPosting.languagesRequired.map(
          (lang) => lang.value || lang
        ),
      };
      const response = await updateJobPosting(editedPosting._id, editedPosting);
      const updatedPosting = response.jobPosting;
      setJobPostings((prev) =>
        prev.map((posting) =>
          posting._id === updatedPosting._id ? updatedPosting : posting
        )
      );
      setIsPopupOpen(false);
      setShowConfirmation(true);
      setEditingJob(null);
      addToAuditTrail(
        updatedPosting._id,
        "Edit",
        `Job posting ${isDraft ? "saved as draft" : "updated"}`
      );
    } catch (error) {
      console.error("Error updating job posting:", error);
    }
  };

  const addToAuditTrail = async (jobId, action, description) => {
    const auditEntry = {
      jobId,
      action,
      description,
      recruiter: "Current User", // You might want to replace this with actual user information
    };

    try {
      const response = createAuditTrailEntry(auditEntry);
      const newAuditEntry = response.data.auditEntry;
      setAuditTrail((prev) => [newAuditEntry, ...prev]);
    } catch (error) {
      console.error("Error adding audit trail entry:", error);
    }
  };

  const handleOpenNewJobForm = () => {
    if (savedTemplates.length === 0) {
      setIsPopupOpen(true);
      setShowConfirmation(false);
      setEditingJob(null);
    } else {
      setIsCreateWithTemplate(true);
    }
  };

  const handleOpenEditJobForm = (jobPosting) => {
    const formattedJobPosting = {
      ...jobPosting,
      jobTitle: { value: jobPosting.jobTitle, label: jobPosting.jobTitle },
      jobType: jobPosting.jobType.map((type) => ({ value: type, label: type })),
      department: {
        value: jobPosting.department,
        label: jobPosting.department,
      },
      jobLevel: { value: jobPosting.jobLevel, label: jobPosting.jobLevel },
      technicalSkills: jobPosting.technicalSkills.map((skill) => ({
        value: skill,
        label: skill,
      })),
      languagesRequired: jobPosting.languagesRequired.map((lang) => ({
        value: lang,
        label: lang,
      })),
    };
    setEditingJob(formattedJobPosting);
    setIsPopupOpen(true);
    setShowConfirmation(false);
  };

  const filteredJobPostings = jobPostings
    ? jobPostings.filter(
        (posting) =>
          (filterStatus === "all" || posting.status === filterStatus) &&
          (posting.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ??
            false)
      )
    : [];

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredJobPostings.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <JobPostingManagement>
      <JobPostingDashboardContainer>
        <Title>Job Postings</Title>

        {isCreateWithTemplate && (
          <TemplateSelector
            onSelect={(template) => {
              setSelectedTemplate(template);
              setIsCreateWithTemplate(false);
              setIsPopupOpen(true);
            }}
            onCancel={() => setIsCreateWithTemplate(false)}
            savedTemplates={savedTemplates}
          />
        )}

        {isPopupOpen && (
          <JobPostingForm
            onSubmit={
              editingJob ? handleEditJobPosting : handleCreateJobPosting
            }
            onPreview={handlePreviewJobPosting}
            onClose={() => {
              setIsPopupOpen(false);
              setEditingJob(null);
              setSelectedTemplate(null);
            }}
            jobOptions={jobList.map((job) => ({ value: job, label: job }))}
            cities={cities}
            currencies={currencies}
            editingJob={editingJob}
            template={selectedTemplate}
            savedTemplates={savedTemplates}
            setSavedTemplates={setSavedTemplates}
            setIsPopupOpen={setIsPopupOpen}
            setShowConfirmation={setShowConfirmation}
          />
        )}

        {previewJobPosting && (
          <JobPostingPreview
            jobPosting={previewJobPosting}
            onClose={handleClosePreview}
          />
        )}

        <ConfirmationDialog
          show={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onCreateAnother={handleOpenNewJobForm}
        />

        <TopControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onCreateNewJob={handleOpenNewJobForm}
        />

        <JobPostingsTable
          jobPostings={currentPosts}
          onStatusChange={handleStatusChange}
          onPreview={handlePreviewJobPosting}
          onEdit={handleOpenEditJobForm}
          onDelete={handleDeletePosting}
          onDuplicate={handleDuplicatePosting}
        />

        <Pagination
          currentPage={currentPage}
          totalPosts={filteredJobPostings.length}
          postsPerPage={postsPerPage}
          paginate={paginate}
        />
      </JobPostingDashboardContainer>
      <AuditTrail auditTrail={auditTrail} />
    </JobPostingManagement>
  );
};

export default JobPostingDashboard;
