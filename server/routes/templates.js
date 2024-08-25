// routes/templates.js
const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router.post("/", templateController.createTemplate);
router.get("/", templateController.getTemplates);
router.delete("/:id", templateController.deleteTemplate);

module.exports = router;
