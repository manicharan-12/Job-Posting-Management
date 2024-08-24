const mongoose = require('mongoose');

const auditTrailSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosting', required: true },
    action: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    recruiter: { type: String, required: true }
  });

module.exports = mongoose.model('AuditTrail', auditTrailSchema);