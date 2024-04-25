import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  otp: string;
}

const verifyemailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,otp
}) => (
  <div>
    <h1>Welcome, {username}!</h1>
    <p>
        Your OTP is {otp}
    </p>
    <a href={`${process.env.DOMAIN}/verify-code?username=${username}`}>Click here to verify</a>
    
  </div>
);

export default verifyemailTemplate;
