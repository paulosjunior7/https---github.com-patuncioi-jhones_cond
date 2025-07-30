import React from 'react';

interface IconHumanProps {
  size?: number;
  color?: string;
  className?: string;
}

const IconHuman: React.FC<IconHumanProps> = ({ 
  size = 103, 
  color = 'currentColor', 
  className = '' 
}) => {
  return (
    <svg 
      width={size} 
      height={size * (90/103)} 
      viewBox="0 0 103 90" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_174_350)">
        <path 
          d="M78.5842 15.6827L47.1106 24.8799L67.7406 95.4776L57.2494 98.5433L47.7279 65.9597L37.2367 69.0255L46.7583 101.609L36.2671 104.675L15.6371 34.077L-15.8364 43.2741L-19.0102 32.413L75.4103 4.82153M20.2654 -8.53574C23.0479 -9.34881 26.0507 -8.98429 28.6134 -7.52235C31.1761 -6.06042 33.0887 -3.62083 33.9305 -0.740259C34.7722 2.14031 34.4742 5.22589 33.1019 7.83769C31.7296 10.4495 29.3956 12.3736 26.6131 13.1866C23.8307 13.9997 20.8278 13.6352 18.2652 12.1733C15.7025 10.7113 13.7899 8.27174 12.9481 5.39117C11.1866 -0.636792 14.4428 -6.83426 20.2654 -8.53574Z" 
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_174_350">
          <rect width="102.204" height="116.804" fill="white" transform="translate(-28 3.66696) rotate(-16.2893)"/>
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconHuman; 