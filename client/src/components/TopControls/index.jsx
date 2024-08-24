import React from 'react';
import { TopControls, SearchInput, JobStatus, CreateJobButton } from './styledComponents.js';

const TopControlsComponent = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus, onCreateNewJob }) => (
  <TopControls>
    <SearchInput
      type="text"
      placeholder="Search job roles..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <JobStatus
      value={filterStatus}
      onChange={(e) => setFilterStatus(e.target.value)}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
      <option value="closed">Closed</option>
      <option value="draft">Draft</option>
    </JobStatus>
    
    <CreateJobButton onClick={onCreateNewJob}>
      Create New Job
    </CreateJobButton>
  </TopControls>
);

export default TopControlsComponent;