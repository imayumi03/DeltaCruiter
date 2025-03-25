import React from "react";
import "./LandingPage.css";
import { Link } from 'react-router-dom'; 
import howItWorksImg from "./Untitled design.png"; // Adjust path if needed
import logo from "../../logo.png";



const LandingPage = () => {

  return (
    <>
    {/* Header */}
    <header className="header">
      <div className="logo">
        <img src={logo} alt="DeltaCruiter logo" />
      </div>
      <nav className="nav-links">
        <a href="#contact">Contact Us</a>
        <a href="#about">About Us</a>
        <Link to="/login">
          <button className="sign-in">Sign In</button>
        </Link>
        <Link to="/signup">
          <button className="sign-up">Sign Up</button>
        </Link>
      </nav>
    </header>
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">AI-Powered Recruiting Made Simple!</h1>
        <p className="hero-subtitle">
          Optimize your hiring process with intelligent resume screening and job matching.
        </p>
        <div className="hero-buttons">
          <Link to="/signup">
            <button className="cta-primary">Get Started</button>
          </Link>
          <button className="cta-secondary">Learn More</button>
        </div>
      </header>
      
      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Use DeltaCruiter?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Resume Parsing</h3>
            <p>Extracts key details from CVs automatically.</p>
          </div>
          <div className="feature-card">
            <h3>Job Match Scoring</h3>
            <p>AI ranks candidates based on job descriptions.</p>
          </div>
          <div className="feature-card">
            <h3>Recruiter Dashboard</h3>
            <p>Filter and shortlist candidates easily.</p>
          </div>
          <div className="feature-card">
            <h3>Skill Matching</h3>
            <p>Identifies missing or extra skills in applications.</p>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="how-it-works-container">
          <div className="how-it-works-image">
            <img src={howItWorksImg} alt="How It Works Illustration" />
          </div>
          <div className="how-it-works-content">
            <div className="step"> 🔃 Upload resumes</div>
            <div className="step"> 📈 AI analyzes & ranks candidates</div>
            <div className="step"> ✔️Shortlist & make data-driven decisions</div>
          </div>
        </div>
      </section>

      
      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">What Recruiters Say</h2>
        <p>"DeltaCruiter saved us hours of manual screening! Highly recommend." - HR Manager</p>
      </section>
      
      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Transform Your Hiring Process?</h2>
        <Link to="/signup">
          <button className="cta-primary">Sign Up Now</button>
        </Link>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 DeltaCruiter. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
    </>
  );
};

export default LandingPage;
