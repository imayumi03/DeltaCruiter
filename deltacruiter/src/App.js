import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import JobPostings from './pages/PostJob/JobPostings';
import Layout from './layout'; // The layout containing the Sidebar
import Candidates from './pages/Candidates/Candidates';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<JobPostings />} />
          <Route path="/candidates" element={<Candidates />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;