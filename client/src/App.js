import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobPostingDashboard from "./components/JobPostingDashboard";
import ApplicationsManagement from "./components/ApplicationsManagement";
import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<JobPostingDashboard />} />
      <Route path="/job-applications/:postingId" element={<ApplicationsManagement />} />
    </Routes>
  </Router>
);

export default App;

//<Route path="/job-applications/:postingId" element={<JobApplicationsList />} />