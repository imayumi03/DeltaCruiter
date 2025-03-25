import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import './Signup.css'; 

const SignupPage = () => {
  return (
    <div className="signup-container">
      <SignUp />
    </div>
  );
};

export default SignupPage;