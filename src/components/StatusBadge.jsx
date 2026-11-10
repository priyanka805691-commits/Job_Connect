import React from 'react';
import { Clock, CheckCircle2, XCircle, Eye, UserCheck, AlertTriangle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const norm = (status || '').toLowerCase();

  switch (norm) {
    case 'approved':
      return (
        <span className="badge badge-success">
          <CheckCircle2 size={13} /> Approved
        </span>
      );
    case 'pending':
    case 'pending approval':
      return (
        <span className="badge badge-warning">
          <Clock size={13} /> Pending
        </span>
      );
    case 'rejected':
      return (
        <span className="badge badge-danger">
          <XCircle size={13} /> Rejected
        </span>
      );
    case 'reviewed':
      return (
        <span className="badge badge-info">
          <Eye size={13} /> Reviewed
        </span>
      );
    case 'shortlisted':
      return (
        <span className="badge badge-primary">
          <UserCheck size={13} /> Shortlisted
        </span>
      );
    case 'interviewing':
      return (
        <span className="badge badge-primary">
          <Clock size={13} /> Interviewing
        </span>
      );
    case 'accepted':
      return (
        <span className="badge badge-success">
          <CheckCircle2 size={13} /> Accepted
        </span>
      );
    default:
      return <span className="badge badge-secondary">{status}</span>;
  }
};

export default StatusBadge;

