// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from "./logo.png";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import './App.css';

const Layout = () => {
  return (
    <div className="dashboard-container">
      <SignedIn>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <img src={logo} alt="DeltaCruiter logo" />
            </div>
          </div>
          <nav>
            <ul>
              <li><a href="/dashboard"><i className="icon-dashboard"></i> Dashboard</a></li>
              <li><a href="/candidates"><i className="icon-candidates"></i> Candidates</a></li>
              <li><a href="/jobs"><i className="icon-jobs"></i> Jobs</a></li>
              <li><a href="/analytics"><i className="icon-analytics"></i> Analytics</a></li>
              <li><a href="/team"><i className="icon-team"></i> Team</a></li>
              <li><a href="/settings"><i className="icon-settings"></i> Settings</a></li>
            </ul>
          </nav>
        </div>

        
        <div className="layout">
          <Outlet />
        </div>
      </SignedIn>
    </div>
  );
};

export default Layout;