import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../logo.png";
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

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

      <div className="contact-container">
        {/* Hero Section */}
        <section className="contact-hero">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Reach out with any questions or feedback.</p>
        </section>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <h3>Email</h3>
              <p>support@deltacruiter.com</p>
            </div>
            <div className="info-card">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-card">
              <h3>Office</h3>
              <p>123 Tech Street, Silicon Valley, CA 94025</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>

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

export default ContactUs;