import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, UserButton } from "@clerk/clerk-react";
import './Candidates.css'; 


const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:8000/candidates/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch candidates');
        }
        
        const data = await response.json();
        setCandidates(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading candidates...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'new': return 'status-new';
      case 'interview': return 'status-interview';
      case 'offer': return 'status-offer';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  const handleViewCandidate = (id) => {
    // Navigate to the candidate's detail page
    window.location.href = `/candidates/${id}`;
  };
  

  return (
    <div className="candidates-page">
      <SignedIn>
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <h1>Candidates</h1>
          <div className="topbar-actions">
            <Link to="/jobs">
              <button className="btn-primary">+ Add Candidate</button>
            </Link>
            <div className="notifications">
              <i className="icon-bell"></i>
              <span className="badge">2</span>
            </div>
            <div className="user-button-container">
              <UserButton />
            </div>
          </div>
        </div>

        {/* Candidates Content */}
        <div className="candidates-content">
          {/* Search and Filters */}
          <div className="candidates-toolbar">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search candidates..." 
                className="search-input"
              />
              <i className="icon-search"></i>
            </div>
            <div className="filters">
              <select className="filter-select">
                <option>All Status</option>
                <option>New</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              <select className="filter-select">
                <option>All Positions</option>
                <option>Frontend Developer</option>
                <option>Backend Engineer</option>
                <option>UX Designer</option>
                <option>Product Manager</option>
              </select>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="candidates-table-container">
            <table className="candidates-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Applied</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(candidate => (
                  <tr key={candidate.id}>
                    <td>
                      <button onClick={() => handleViewCandidate(candidate.id)}
                        >
                        <div className="candidate-name">
                          <div className="candidate-avatar">
                            {candidate.name?.charAt(0) || '?'}
                          </div>
                          {candidate.name || 'No Name'}
                        </div>
                      </button>
                    </td>
                    <td>{candidate.position || '-'}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(candidate.status)}`}>
                        {candidate.status || 'Unknown'}
                      </span>
                    </td>
                    <td>{candidate.applied} </td>
                    <td>{candidate.experience}</td>                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="pagination-button disabled">
              <i className="icon-chevron-left"></i>
            </button>
            <button className="pagination-button active">1</button>
            <button className="pagination-button">2</button>
            <button className="pagination-button">3</button>
            <button className="pagination-button">
              <i className="icon-chevron-right"></i>
            </button>
          </div>
        </div>
      </SignedIn>
    </div>
  );
};

export default Candidates;