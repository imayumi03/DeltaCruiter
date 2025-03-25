import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, UserButton } from "@clerk/clerk-react";
import './JobPostings.css'; // We'll create this CSS file

const JobPostings = () => {
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    type: '',
    location: '',
    description: ''
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:8000/jobs/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading jobs...</p>
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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8000/jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add job');
      }
  
      const addedJob = await response.json();
  
      // Update the job list with the new job from the backend
      setJobs(prev => [...prev, addedJob]);
  
      // Reset form and close modal
      setNewJob({
        title: '',
        department: '',
        type: '',
        location: '',
        description: ''
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error adding job:', error);
      setError(error.message);
    }
  };
  

  const toggleJobStatus = (id) => {
    setJobs(prev => prev.map(job => 
      job.id === id 
        ? { ...job, status: job.status === 'Active' ? 'Paused' : 'Active' } 
        : job
    ));
  };

  return (
    <div className="jobpostings-page">
      <SignedIn>
        {/* Top Bar - Consistent with Dashboard */}
        <div className="dashboard-topbar">
          <h1>Job Postings</h1>
          <div className="topbar-actions">
            <button 
              className="btn-primary"
              onClick={() => setShowModal(true)}
            >
              + New Job
            </button>
            <div className="notifications">
              <i className="icon-bell"></i>
              <span className="badge">1</span>
            </div>
            <div className="user-button-container">
              <UserButton />
            </div>
          </div>
        </div>

        {/* Job Postings Content */}
        <div className="jobpostings-content">
          {/* Search and Filters */}
          <div className="jobpostings-toolbar">
            <div className="search-container">
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="search-input"
              />
              <i className="icon-search"></i>
            </div>
            <div className="filters">
              <select className="filter-select">
                <option>All Statuses</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Draft</option>
                <option>Closed</option>
              </select>
              <select className="filter-select">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Product</option>
                <option>Marketing</option>
              </select>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="jobpostings-table-container">
            <table className="jobpostings-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Department</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Posted</th>
                  <th>Applicants</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id}>
                    <td>
                      <Link to={`/jobs/${job.id}`} className="job-title">
                        {job.title}
                      </Link>
                    </td>
                    <td>{job.department}</td>
                    <td>{job.type}</td>
                    <td>{job.location}</td>
                    <td>{job.posted}</td>
                    <td>
                      <span className="applicants-count">
                        {job.applicants}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${job.status.toLowerCase()}`}>
                        {job.status}
                      </span>
                    </td>
                    <td>
                      <div className="job-actions">
                        <button 
                          className="status-toggle"
                          onClick={() => toggleJobStatus(job.id)}
                        >
                          {job.status === 'Active' ? 'Pause' : 'Activate'}
                        </button>
                        <button className="action-button edit">
                          <i className="icon-edit"></i>
                        </button>
                      </div>
                    </td>
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

        {/* New Job Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="add-job-modal">
              <div className="modal-header">
                <h2>Create New Job Posting</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newJob.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Department</label>
                    <select
                      name="department"
                      value={newJob.department}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Product">Product</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Job Type</label>
                    <select
                      name="type"
                      value={newJob.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={newJob.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Job Description</label>
                    <textarea
                      name="description"
                      value={newJob.description}
                      onChange={handleInputChange}
                      rows="6"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Create Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </SignedIn>
    </div>
  );
};

export default JobPostings;