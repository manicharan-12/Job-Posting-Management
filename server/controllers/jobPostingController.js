const JobPosting = require("../models/JobPosting");
const AuditTrail = require("../models/AuditTrail");
const { parseISO, isBefore } = require("date-fns");

// Create a new job posting
exports.createJobPosting = async (req, res) => {
  try {
    const jobPostingData = req.body;

    // Parse the applicationDeadline string to a Date object
    jobPostingData.applicationDeadline = parseISO(
      jobPostingData.applicationDeadline
    );

    const newJobPosting = new JobPosting(jobPostingData);
    await newJobPosting.save();
    res.status(201).json({
      message: "Job posting created successfully",
      jobPosting: newJobPosting,
    });
  } catch (error) {
    console.error("Error creating job posting:", error);
    res
      .status(500)
      .json({ message: "Error creating job posting", error: error.message });
  }
};

// Get all job postings
exports.getJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find();
    res.status(200).json(jobPostings);
  } catch (error) {
    console.error("Error fetching job postings:", error);
    res
      .status(500)
      .json({ message: "Error fetching job postings", error: error.message });
  }
};

// Delete a job posting
exports.deleteJobPosting = async (req, res) => {
  try {
    const deletedJob = await JobPosting.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job posting not found" });
    }
    res.status(200).json({ message: "Job posting deleted successfully" });
  } catch (error) {
    console.error("Error deleting job posting:", error);
    res
      .status(500)
      .json({ message: "Error deleting job posting", error: error.message });
  }
};

// Duplicate a job posting
exports.duplicateJobPosting = async (req, res) => {
  try {
    const originalJob = await JobPosting.findById(req.params.id);
    if (!originalJob) {
      return res.status(404).json({ message: "Job posting not found" });
    }
    const duplicatedJob = new JobPosting(originalJob.toObject());
    duplicatedJob._id = undefined;
    duplicatedJob.isNew = true;
    await duplicatedJob.save();
    res
      .status(201)
      .json({
        message: "Job posting duplicated successfully",
        jobPosting: duplicatedJob,
      });
  } catch (error) {
    console.error("Error duplicating job posting:", error);
    res
      .status(500)
      .json({ message: "Error duplicating job posting", error: error.message });
  }
};

// Update a job posting
exports.updateJobPosting = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findById(req.params.id);
    if (!jobPosting) {
      return res.status(404).json({ message: "Job posting not found" });
    }

    // If status is being changed from closed to active, ensure a new deadline is provided
    if (jobPosting.status === "closed" && req.body.status === "active") {
      if (!req.body.applicationDeadline) {
        return res
          .status(400)
          .json({
            message:
              "New application deadline is required to reactivate a closed job posting",
          });
      }
      const newDeadline = parseISO(req.body.applicationDeadline);
      if (isBefore(newDeadline, new Date())) {
        return res
          .status(400)
          .json({ message: "New application deadline must be in the future" });
      }
      req.body.applicationDeadline = newDeadline;
    }

    const updatedJob = await JobPosting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "Job posting updated successfully",
        jobPosting: updatedJob,
      });
  } catch (error) {
    console.error("Error updating job posting:", error);
    res
      .status(500)
      .json({ message: "Error updating job posting", error: error.message });
  }
};
