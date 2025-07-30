import React from 'react';

interface IconUnlockerProps {
  size?: number;
  color?: string;
  className?: string;
}

const IconUnlocker: React.FC<IconUnlockerProps> = ({ 
  size = 14, 
  color = 'currentColor', 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size * (18/14)} 
      viewBox="0 0 14 18" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M13.5 17.5V8.99998H3.74999V5.55748C3.74999 3.71124 5.19737 2.20001 7.00002 2.20001C8.80263 2.20001 10.25 3.71124 10.25 5.55748H11.875C11.875 2.75627 9.6847 0.5 7.00002 0.5C4.31534 0.5 2.12501 2.75627 2.12501 5.55748V8.99998H0.5V17.5H13.5Z" 
        fill={color}
      />
    </svg>
  );
};

export default IconUnlocker; 