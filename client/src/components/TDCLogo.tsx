import React from 'react';

interface TDCLogoProps {
  className?: string;
}

const TDCLogo: React.FC<TDCLogoProps> = ({ className = "h-10" }) => {
  return (
    <img 
      src="https://res.cloudinary.com/dmcv3bbe0/image/upload/v1747817993/Final_logo_t7jlt2.png" 
      alt="The Devinci Code Logo" 
      className={className} 
    />
  );
};

export default TDCLogo;
