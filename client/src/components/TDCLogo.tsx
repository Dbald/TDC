import React from 'react';

interface TDCLogoProps {
  className?: string;
}

const TDCLogo: React.FC<TDCLogoProps> = ({ className = "h-10" }) => {
  return (
    <img 
      src="/assets/Final_logo.png" 
      alt="The Devinci Code Logo" 
      className={className} 
    />
  );
};

export default TDCLogo;
