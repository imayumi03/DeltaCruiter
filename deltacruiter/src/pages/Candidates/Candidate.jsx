import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SignedIn, UserButton } from "@clerk/clerk-react";
import './Candidate.css';

const Candidate = () => {
  const { id } = useParams();
  
  const candidateData = [
    {
      id: 1,
      name: 'Alex Johnson',
      position: 'Frontend Developer',
      status: 'Interview',
      applied: '2023-05-15',
      experience: '3 years',
      email: 'alex.johnson@example.com',
      phone: '(123) 456-7890',
      skills: ['React', 'JavaScript', 'CSS', 'HTML5', 'Redux'],
      education: [
        {
          degree: 'BS Computer Science',
          university: 'University of Tech',
          year: '2020'
        }
      ],
      experienceDetails: [
        {
          position: 'Frontend Developer',
          company: 'Tech Solutions Inc.',
          duration: '2020 - Present',
          responsibilities: [
            'Developed responsive web applications',
            'Collaborated with UX designers',
            'Implemented new features'
          ]
        }
      ],
      notes: 'Excellent communication skills. Second interview scheduled for next week.'
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
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'NLP'],
      education: [
        {
          degree: 'MS Data Science',
          university: 'AI Institute',
          year: '2021'
        }
      ],
      experienceDetails: [
        {
          position: 'Data Scientist',
          company: 'Analytics Hub',
          duration: '2021 - Present',
          responsibilities: [
            'Built predictive models',
            'Optimized ML pipelines',
            'Conducted data analysis'
          ]
        }
      ],
      notes: 'Strong technical background. Awaiting technical assessment results.'
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
      skills: ['Node.js', 'Express', 'MongoDB', 'Docker', 'AWS'],
      education: [
        {
          degree: 'BS Software Engineering',
          university: 'Tech University',
          year: '2019'
        }
      ],
      experienceDetails: [
        {
          position: 'Backend Developer',
          company: 'Cloud Solutions Ltd.',
          duration: '2019 - Present',
          responsibilities: [
            'Developed REST APIs',
            'Managed cloud infrastructure',
            'Optimized database queries'
          ]
        }
      ],
      notes: 'Experienced with cloud technologies. Resume under review.'
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
      skills: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'Design Thinking'],
      education: [
        {
          degree: 'BA Graphic Design',
          university: 'Design Academy',
          year: '2018'
        }
      ],
      experienceDetails: [
        {
          position: 'UI/UX Designer',
          company: 'Creative Studios',
          duration: '2018 - Present',
          responsibilities: [
            'Designed user interfaces for mobile and web',
            'Conducted user research and usability testing',
            'Created interactive prototypes'
          ]
        }
      ],
      notes: 'Strong portfolio. Awaiting feedback from the hiring manager.'
    }
  ].find(candidate => candidate.id === parseInt(id));

  if (!candidateData) {
    return <div>Candidate not found</div>;
  }

  return (
    <div className="candidate-page">
      <SignedIn>
        {/* Top Bar */}
        <div className="dashboard-topbar">
          <Link to="/candidates" className="back-button">
            &larr; Back to Candidates
          </Link>
          <h1>Candidate Details</h1>
          <div className="topbar-actions">
            <div className="notifications">
              <i className="icon-bell"></i>
              <span className="badge">1</span>
            </div>
            <div className="user-button-container">
              <UserButton />
            </div>
          </div>
        </div>

        {/* Candidate Content */}
        <div className="candidate-content">
          {/* Candidate Header */}
          <div className="candidate-header">
            <div className="candidate-avatar-large">
              {candidateData.name.charAt(0)}
            </div>
            <div className="candidate-info">
              <h2>{candidateData.name}</h2>
              <p className="candidate-position">{candidateData.position}</p>
              <div className="candidate-meta">
                <span className="status-badge">{candidateData.status}</span>
                <span>Applied: {candidateData.applied}</span>
                <span>Experience: {candidateData.experience}</span>
              </div>
            </div>
          </div>

          {/* Main Details Sections */}
          <div className="candidate-details-grid">
            {/* Contact Information */}
            <div className="detail-section">
              <h3>Contact Information</h3>
              <div className="detail-content">
                <p><strong>Email:</strong> {candidateData.email}</p>
                <p><strong>Phone:</strong> {candidateData.phone}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="detail-section">
              <h3>Skills</h3>
              <div className="skills-list">
                {candidateData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="detail-section">
              <h3>Education</h3>
              {candidateData.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <p><strong>{edu.degree}</strong></p>
                  <p>{edu.university}, {edu.year}</p>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="detail-section full-width">
              <h3>Work Experience</h3>
              {candidateData.experienceDetails.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-header">
                    <p><strong>{exp.position}</strong> at {exp.company}</p>
                    <p className="experience-duration">{exp.duration}</p>
                  </div>
                  <ul className="responsibilities">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Notes */}
            <div className="detail-section full-width">
              <h3>Notes</h3>
              <div className="notes-content">
                <p>{candidateData.notes}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="candidate-actions">
            <button className="btn-primary">Schedule Interview</button>
            <button className="btn-secondary">Download Resume</button>
            <button className="btn-outline">Add Note</button>
          </div>
        </div>
      </SignedIn>
    </div>
  );
};

export default Candidate;