import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import './Login.css'; 

const LoginPage = () => {
  return (
    <div className="login-container">
      <SignIn forceRedirectUrl={"/dashboard"}/>
    </div>
  );
};

export default LoginPage;