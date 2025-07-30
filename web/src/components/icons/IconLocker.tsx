import React from 'react';

interface IconLockerProps {
  size?: number;
  color?: string;
  className?: string;
}

const IconLocker: React.FC<IconLockerProps> = ({ 
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
        d="M7.00002 0.5C9.6847 0.5 11.875 2.79878 11.875 5.6V8.99998H13.5V17.5H0.5V8.99998H2.12501V5.6C2.12501 2.79878 4.31534 0.5 7.00002 0.5ZM7.00002 2.20001C5.19737 2.20001 3.74999 3.75376 3.74999 5.6V8.99998H10.25V5.6C10.25 3.75376 8.80263 2.20001 7.00002 2.20001Z" 
        fill={color}
      />
    </svg>
  );
};

export default IconLocker; 