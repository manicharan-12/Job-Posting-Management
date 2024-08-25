const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jobPostingsRoutes = require("./routes/jobPostings");
const auditTrailRoutes = require("./routes/auditTrail");
const templatesRoutes = require("./routes/templates");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./config/db");
const { initCronJobs } = require("./utils/cronJobs");

const app = express();

//https://job-posting-management-liard.vercel.app
//http://localhost:3000

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "https://job-posting-management-liard.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Initialize cron jobs
initCronJobs();

// Routes
app.use("/job-postings", jobPostingsRoutes);
app.use("/audit-trail", auditTrailRoutes);
app.use("/templates", templatesRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
