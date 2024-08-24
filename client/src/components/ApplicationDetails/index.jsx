import React from 'react';

import { ModalOverlay, ModalContent, Button, Link , ButtonContainer , ShortlistButton , ProfileTitle, ProfileSection, SectionTitle, InfoText, SkillsList, SkillItem, ApplicationHistoryTable, TableHeader, TableCell } from './styledComponents';


const ApplicationDetails = ({ candidate, onClose, onShortlist, isShortlisted }) => {
  const handleViewResume = () => {
    window.open(candidate.resume, '_blank');
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ProfileTitle>{candidate.name}'s Application</ProfileTitle>
        
        <ProfileSection>
          <SectionTitle>Professional Summary</SectionTitle>
          <InfoText>{candidate.summary}</InfoText>
        </ProfileSection>
        
        <ProfileSection>
          <SectionTitle>Contact Information</SectionTitle>
          <InfoText>Location: {candidate.location}</InfoText>
          <InfoText>Email: {candidate.email}</InfoText>
          <InfoText>Phone: {candidate.phone}</InfoText>
          {candidate.linkedin_url && <InfoText>LinkedIn: <Link href={candidate.linkedin_url} target="_blank" rel="noreferrer">View LinkedIn Profile</Link></InfoText>}
          {candidate.portfolio_website && <InfoText>Portfolio: <Link href={candidate.portfolio_website} target="_blank" rel="noreferrer">View Portfolio</Link></InfoText>}
        </ProfileSection>
        
        <ProfileSection>
          <SectionTitle>Education</SectionTitle>
          <InfoText>Degree: {candidate.highest_degree_obtained}</InfoText>
          <InfoText>Graduation: {candidate.graduation_period}</InfoText>
          <InfoText>GPA: {candidate.gpa}</InfoText>
        </ProfileSection>
        
        <ProfileSection>
          <SectionTitle>Skills</SectionTitle>
          <SkillsList>
            {candidate.skills.map((skill, index) => (
              <SkillItem key={index}>{skill}</SkillItem>
            ))}
          </SkillsList>
        </ProfileSection>
        
        <ProfileSection>
          <SectionTitle>Additional Information</SectionTitle>
          <InfoText>Willing to Relocate: {candidate.willing_to_relocate}</InfoText>
          <InfoText>Willing to Travel: {candidate.willing_to_travel}</InfoText>
        </ProfileSection>
        
        <ProfileSection>
          <SectionTitle>Application History</SectionTitle>
          <ApplicationHistoryTable>
            <thead>
              <tr>
                <TableHeader>Job Title</TableHeader>
                <TableHeader>Applied Date</TableHeader>
                <TableHeader>Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {candidate.applicationHistory.map((application, index) => (
                <tr key={index}>
                  <TableCell>{application.jobTitle}</TableCell>
                  <TableCell>{application.appliedDate}</TableCell>
                  <TableCell>{application.status}</TableCell>
                </tr>
              ))}
            </tbody>
          </ApplicationHistoryTable>
        </ProfileSection>
        
        <ButtonContainer>
          <Button onClick={handleViewResume}>View Resume</Button>
          <ShortlistButton 
            onClick={() => onShortlist(candidate.id)} 
            isShortlisted={isShortlisted}
          >
            {isShortlisted ? 'Remove from Shortlist' : 'Shortlist Candidate'}
          </ShortlistButton>
          <Button onClick={onClose}>Close</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ApplicationDetails;