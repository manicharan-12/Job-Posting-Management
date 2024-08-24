const express = require("express");
const router = express.Router();
const jobPostingController = require("../controllers/jobPostingController");

router.post("/", jobPostingController.createJobPosting);
router.get("/", jobPostingController.getJobPostings);
router.delete("/:id", jobPostingController.deleteJobPosting);
router.post("/:id/duplicate", jobPostingController.duplicateJobPosting);
router.put("/:id", jobPostingController.updateJobPosting);

module.exports = router;
