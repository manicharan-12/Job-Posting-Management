const express = require("express");
const router = express.Router();
const auditTrailController = require("../controllers/auditTrailController");

router.post("/", auditTrailController.createAuditTrailEntry);
router.get("/:jobId", auditTrailController.getAuditTrailEntries);

module.exports = router;
