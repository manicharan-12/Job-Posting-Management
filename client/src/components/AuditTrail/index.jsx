import React from "react";
import {
  AuditTrailContainer,
  Title,
  Table,
  TableHead,
  TableCell,
  TableRow,
} from "./styledComponents.js";

const AuditTrail = ({ auditTrail }) => {
  return (
    <AuditTrailContainer>
      <Title>Audit Trail</Title>
      <Table>
        <TableHead>
          <tr>
            <TableCell as="th">Job ID</TableCell>
            <TableCell as="th">Recruiter</TableCell>
            <TableCell as="th">Action</TableCell>
            <TableCell as="th">Description</TableCell>
            <TableCell as="th">Timestamp</TableCell>
          </tr>
        </TableHead>
        <tbody>
          {auditTrail.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.jobId}</TableCell>
              <TableCell>{entry.recruiter}</TableCell>
              <TableCell>{entry.action}</TableCell>
              <TableCell>{entry.description}</TableCell>
              <TableCell>
                {new Date(entry.timestamp).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </AuditTrailContainer>
  );
};

export default AuditTrail;
