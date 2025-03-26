import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, UserButton } from "@clerk/clerk-react";
import './Candidates.css';

const Candidates = () => {

  // State for the add candidate modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    position: '',
    status: 'New',
    email: '',
    phone: '',
    resume: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidate(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewCandidate(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new candidate object
    const candidateToAdd = {
      id: candidates.length + 1,
      name: newCandidate.name,
      position: newCandidate.position,
      status: newCandidate.status,
      applied: new Date().toISOString().split('T')[0],
      experience: '', // Will be parsed from resume
      email: newCandidate.email,
      phone: newCandidate.phone,
      skills: [], // Will be parsed from resume
      education: '' // Will be parsed from resume
    };

    // Should send the resume to backend for parsing
    // For now, we'll just add the candidate to local state
    setCandidates(prev => [...prev, candidateToAdd]);
    
    // Reset form and close modal
    setNewCandidate({
      name: '',
      position: '',
      status: 'New',
      email: '',
      phone: '',
      resume: null
    });
    setShowAddModal(false);
  };

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      position: 'Frontend Developer',
      status: 'Interview',
      applied: '2023-05-15',
      experience: '3 years',
      email: 'alex.johnson@example.com',
      phone: '(123) 456-7890',
      skills: ['React', 'JavaScript', 'CSS'],
      education: 'BS Computer Science, University of Tech'
    },
    {
      id: 2,
      name: 'Samantha Lee',
      position: 'Data Scientist',
      status: 'Shortlisted',
      applied: '2023-06-10',
      experience: '5 years',
      email: 'samantha.lee@example.com',
      phone: '(987) 654-3210',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      education: 'MS Data Science, AI Institute'
    },
    {
      id: 3,
      name: 'David Martinez',
      position: 'Backend Developer',
      status: 'Applied',
      applied: '2023-07-05',
      experience: '4 years',
      email: 'david.martinez@example.com',
      phone: '(456) 789-0123',
      skills: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      education: 'BS Software Engineering, Tech University'
    },
    {
      id: 4,
      name: 'Emily Brown',
      position: 'UI/UX Designer',
      status: 'Interview',
      applied: '2023-04-20',
      experience: '6 years',
      email: 'emily.brown@example.com',
      phone: '(321) 654-0987',
      skills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping'],
      education: 'BA Graphic Design, Design Academy'
    }
  ]);

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'new': return 'status-new';
      case 'interview': return 'status-interview';
      case 'offer': return 'status-offer';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  return (
    <div className="candidates-page">
      <SignedIn>
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <h1>Candidates</h1>
          <div className="topbar-actions">
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              + Add Candidate
            </button>
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
                <option>All Statuses</option>
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
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(candidate => (
                  <tr key={candidate.id}>
                    <td>
                      <Link to={`/candidates/${candidate.id}`} className="candidate-name">
                        <div className="candidate-avatar">
                          {candidate.name.charAt(0)}
                        </div>
                        {candidate.name}
                      </Link>
                    </td>
                    <td>{candidate.position}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td>{candidate.applied}</td>
                    <td>{candidate.experience}</td>
                    <td>
                      <Link to={`/candidates/${candidate.id}`} className="action-button view">
                        <i className="icon-eye"></i>
                      </Link>
                      <button className="action-button edit">
                        <i className="icon-edit"></i>
                      </button>
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

        {/* Add Candidate Modal */}
        {showAddModal && (
          <div className="modal-overlay">
            <div className="add-candidate-modal">
              <div className="modal-header">
                <h2>Add New Candidate</h2>
                <button 
                  className="close-button"
                  onClick={() => setShowAddModal(false)}
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newCandidate.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    value={newCandidate.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={newCandidate.status}
                    onChange={handleInputChange}
                  >
                    <option value="New">New</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newCandidate.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newCandidate.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Resume (PDF/DOCX)</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Add Candidate
                  </button>
                </div>
              </form>
            </div>
          </div>)}
      </SignedIn>
    </div>
  );
};

export default Candidates;