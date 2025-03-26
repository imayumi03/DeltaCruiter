import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../logo.png";
import './AboutUs.css';

const AboutUs = () => {
  return (
    <>
      {/* Header - Matches Landing Page */}
      <header className="header">
        <div className="logo">
          <img src={logo} alt="DeltaCruiter logo" />
        </div>
        <nav className="nav-links">
          <Link to="/contact">Contact Us</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">
            <button className="sign-in">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="sign-up">Sign Up</button>
          </Link>
        </nav>
      </header>

      <div className="about-container">
        {/* Hero Section */}
        <section className="about-hero">
          <h1>About DeltaCruiter</h1>
          <p>Revolutionizing recruitment through AI-powered technology</p>
        </section>

        {/* Mission Section */}
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We're transforming the hiring process by leveraging artificial intelligence to connect 
            top talent with companies efficiently. Our platform eliminates manual screening and 
            reduces hiring bias, making recruitment faster and fairer.
          </p>
        </section>

        {/* Story Section */}
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2023 by HR tech veterans, DeltaCruiter was born from frustration with 
            traditional recruitment methods. After years of seeing qualified candidates overlooked 
            and companies struggling to find the right fit, we built a solution that benefits both 
            job seekers and employers.
          </p>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Meet The Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">MA</div>
              <h3>Mounia Abdelmoumni </h3>
              <p>ChatBot</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">AL</div>
              <h3>Aya lyousfi </h3>
              <p>Resume parsing</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">NB</div>
              <h3>Nisrin Boukhari </h3>
              <p>Job parsing</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">AB</div>
              <h3>Afaf Bentakhou</h3>
              <p>Frontend</p>
            </div>
          </div>
        </section>

        {/* Footer - Matches Landing Page */}
        <footer className="footer">
          <p>&copy; 2025 DeltaCruiter. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <a href="#">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutUs;