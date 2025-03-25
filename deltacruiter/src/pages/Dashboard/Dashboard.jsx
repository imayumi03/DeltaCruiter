import React from 'react';
import './Dashboard.css';
import logo from "../../logo.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { BarChart, PieChart } from '../../components'; 
import { Link } from 'react-router-dom'; 
//import { RecentApplications, UpcomingInterviews } from './Components'; // Additional components

const Dashboard = () => {
  // Sample data for charts
  const applicationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Applications',
      data: [12, 19, 3, 5, 2],
      backgroundColor: '#1E8A91',
    }]
  };

  const candidateSources = {
    labels: ['LinkedIn', 'Indeed', 'Company Website', 'Referrals'],
    datasets: [{
      data: [30, 25, 20, 25],
      backgroundColor: ['#1E8A91', '#0A0F14', '#f75c67', '#D4D4D4'],
    }]
  };

  return (
    <div className="dashboard-container">
      <SignedIn>     
        {/* Main Content */}
        <div className="dashboard-main">
          {/* Top Bar */}
          <div className="dashboard-topbar">
            <h1>Dashboard Overview</h1>
            <div className="topbar-actions">
            <Link to="/jobs">
              <button className="btn-primary">+ New Job</button>
            </Link>
              <div className="notifications">
                <i className="icon-bell"></i>
                <span className="badge">3</span>
              </div>
              <div className="user-button-container">
                 <UserButton />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Open Positions</h3>
              <p className="stat-value">12</p>
              <p className="stat-change">+2 from last month</p>
            </div>
            <div className="stat-card">
              <h3>New Candidates</h3>
              <p className="stat-value">24</p>
              <p className="stat-change">+5 from last week</p>
            </div>
            <div className="stat-card">
              <h3>Interviews</h3>
              <p className="stat-value">8</p>
              <p className="stat-change">3 today</p>
            </div>
            <div className="stat-card">
              <h3>Hiring Rate</h3>
              <p className="stat-value">68%</p>
              <p className="stat-change">+12% improvement</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-container">
              <h3>Applications This Month</h3>
              <BarChart data={applicationData} />
            </div>
            <div className="chart-container">
              <h3>Candidate Sources</h3>
              <PieChart data={candidateSources} />
            </div>
          </div>

          {/* Recent Activity */}
          {/* <div className="activity-section">
            <div className="recent-applications">
              <h3>Recent Applications</h3>
              <RecentApplications />
            </div>
            <div className="upcoming-interviews">
              <h3>Upcoming Interviews</h3>
              <UpcomingInterviews />
            </div>
          </div> */}
        </div>
      </SignedIn>

      <SignedOut>
        <div className="signin-container">
          <div className="signin-card">
            <h2>Welcome to DeltaCruiter</h2>
            <p>Please sign in to access your recruiting dashboard</p>
            <SignInButton className="signin-button" />
          </div>
        </div>
      </SignedOut>
    </div>
  );
};

export default Dashboard;