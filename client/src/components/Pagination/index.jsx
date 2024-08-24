import React from 'react';
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { PaginationContainer, PaginationButton, PaginationNumber } from './styledComponents.js';

const Pagination = ({ currentPage, totalPosts, postsPerPage, paginate }) => {
  const pageNumbers = Math.ceil(totalPosts / postsPerPage);

  return (
    <PaginationContainer>
      <PaginationButton 
        onClick={() => paginate(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        <GrLinkPrevious />
      </PaginationButton>
      
      {Array.from({ length: pageNumbers }, (_, i) => (
        <PaginationNumber 
          key={i} 
          onClick={() => paginate(i + 1)} 
          className={currentPage === i + 1 ? 'active' : ''}
        >
          {i + 1}
        </PaginationNumber>
      ))}
      <PaginationButton 
        onClick={() => paginate(currentPage + 1)} 
        disabled={currentPage === pageNumbers}
      >
        <GrLinkNext />
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;