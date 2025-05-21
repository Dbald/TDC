import React from 'react';

interface TDCLogoProps {
  className?: string;
}

const TDCLogo: React.FC<TDCLogoProps> = ({ className = "h-10" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 823 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M136.5 80H258.5V152H217.5V360H177.5V152H136.5V80Z" 
        fill="white"
      />
      <path 
        d="M323.5 80H445.5V152H393.5V192H465.5V264H393.5V288H445.5V360H323.5V288H356.5V264H323.5V192H356.5V152H323.5V80Z" 
        fill="white"
      />
      <rect 
        x="383.5" 
        y="172" 
        width="76" 
        height="112" 
        fill="black" 
      />
      <path 
        d="M565.5 80H687.5V152H626.5V360H586.5V152H565.5V80Z" 
        fill="white"
      />
      <rect 
        x="606.5" 
        y="192" 
        width="40" 
        height="80" 
        fill="black" 
      />
    </svg>
  );
};

export default TDCLogo;
