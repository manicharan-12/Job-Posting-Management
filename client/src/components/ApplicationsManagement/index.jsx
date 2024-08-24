import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import candidatesData from '../data/candidates.json';
import ApplicationDetails from '../ApplicationDetails';
import ApplicationsTable from '../ApplicationsTable';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const GoBackButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const ApplicationsManagement = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [candidateStatuses, setCandidateStatuses] = useState({});

  useEffect(() => {
    const initialStatuses = {};
    candidatesData.forEach(candidate => {
      initialStatuses[candidate.id] = 'Under Review';
    });
    setCandidateStatuses(initialStatuses);
  }, []);

  const handleCandidateClick = useCallback((candidate) => {
    setSelectedCandidate(candidate);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedCandidate(null);
  }, []);

  const handleShortlist = useCallback((candidateId) => {
    setShortlistedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  }, []);

  const handleStatusUpdate = useCallback((candidateId, newStatus) => {
    setCandidateStatuses(prev => ({
      ...prev,
      [candidateId]: newStatus
    }));
  }, []);

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <GoBackButton onClick={handleGoBack}>Go Back</GoBackButton>
      <Heading>Applications</Heading>
      <ApplicationsTable
        candidates={candidatesData}
        onCandidateClick={handleCandidateClick}
        shortlistedCandidates={shortlistedCandidates}
        candidateStatuses={candidateStatuses}
        onStatusUpdate={handleStatusUpdate}
      />
      {selectedCandidate && (
        <ApplicationDetails 
          candidate={selectedCandidate} 
          onClose={handleCloseDetails}
          onShortlist={handleShortlist}
          isShortlisted={shortlistedCandidates.includes(selectedCandidate.id)}
          onStatusUpdate={handleStatusUpdate}
          currentStatus={candidateStatuses[selectedCandidate.id] || 'Under Review'}
        />
      )}
    </Container>
  );
};

export default React.memo(ApplicationsManagement);




// import React, { useState, useEffect, useCallback } from 'react';
// import candidatesData from '../data/candidates.json';
// import ApplicationDetails from '../ApplicationDetails';
// import ApplicationsTable from '../ApplicationsTable';
// import { Container, Heading } from './styledComponents.js';

// const ApplicationsManagement = () => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
//   const [candidateStatuses, setCandidateStatuses] = useState({});

//   useEffect(() => {
//     const initialStatuses = {};
//     candidatesData.forEach(candidate => {
//       initialStatuses[candidate.id] = 'Under Review';
//     });
//     setCandidateStatuses(initialStatuses);
//   }, []);

//   const handleCandidateClick = useCallback((candidate) => {
//     setSelectedCandidate(candidate);
//   }, []);

//   const handleCloseDetails = useCallback(() => {
//     setSelectedCandidate(null);
//   }, []);

//   const handleShortlist = useCallback((candidateId) => {
//     setShortlistedCandidates(prev => 
//       prev.includes(candidateId)
//         ? prev.filter(id => id !== candidateId)
//         : [...prev, candidateId]
//     );
//   }, []);

//   const handleStatusUpdate = useCallback((candidateId, newStatus) => {
//     setCandidateStatuses(prev => ({
//       ...prev,
//       [candidateId]: newStatus
//     }));
//   }, []);

//   return (
//     <Container>
//       <Heading>Applications</Heading>
//       <ApplicationsTable
//         candidates={candidatesData}
//         onCandidateClick={handleCandidateClick}
//         shortlistedCandidates={shortlistedCandidates}
//         candidateStatuses={candidateStatuses}
//         onStatusUpdate={handleStatusUpdate}
//       />
//       {selectedCandidate && (
//         <ApplicationDetails 
//           candidate={selectedCandidate} 
//           onClose={handleCloseDetails}
//           onShortlist={handleShortlist}
//           isShortlisted={shortlistedCandidates.includes(selectedCandidate.id)}
//           onStatusUpdate={handleStatusUpdate}
//           currentStatus={candidateStatuses[selectedCandidate.id] || 'Under Review'}
//         />
//       )}
//     </Container>
//   );
// };

// export default React.memo(ApplicationsManagement);