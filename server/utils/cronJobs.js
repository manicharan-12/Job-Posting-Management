const cron = require('node-cron');
const JobPosting = require('../models/JobPosting');
const AuditTrail = require('../models/AuditTrail');
const { isBefore } = require('date-fns');

const updateJobPostingStatuses = async () => {
    const now = new Date();
    const jobPostings = await JobPosting.find({ status: 'active' });
  
    for (const jobPosting of jobPostings) {
      if (isBefore(jobPosting.applicationDeadline, now)) {
        jobPosting.status = 'closed';
        await jobPosting.save();
        
        const auditEntry = new AuditTrail({
          jobId: jobPosting._id,
          action: 'Status Change',
          description: 'Job posting status automatically changed to closed due to deadline',
          recruiter: 'Server'
        });
        await auditEntry.save();
      }
    }
  };

const initCronJobs = () => {
  cron.schedule('0 * * * *', updateJobPostingStatuses);
};

module.exports = { initCronJobs };