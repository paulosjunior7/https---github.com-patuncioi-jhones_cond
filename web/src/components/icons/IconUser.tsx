import React from "react";

interface IconUserProps {
  size?: number;
  color?: string;
  className?: string;
}

const IconUser: React.FC<IconUserProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
}) => {
  return (
    <svg
      width={size}
      height={size * (20 / 24)}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_70_78)">
        <path
          d="M22.35 18.8235C22.35 16.7741 20.4295 15.0318 17.75 14.3847M15.45 18.8235C15.45 16.2235 12.3611 14.1177 8.54999 14.1177C4.73889 14.1177 1.64999 16.2235 1.64999 18.8235M15.45 10.5882C16.67 10.5882 17.84 10.0925 18.7027 9.20993C19.5654 8.3274 20.05 7.13044 20.05 5.88237C20.05 4.63429 19.5654 3.43733 18.7027 2.5548C17.84 1.67228 16.67 1.17648 15.45 1.17648M8.54999 10.5882C7.33 10.5882 6.15997 10.0925 5.2973 9.20993C4.43464 8.3274 3.94999 7.13044 3.94999 5.88237C3.94999 4.63429 4.43464 3.43733 5.2973 2.5548C6.15997 1.67228 7.33 1.17648 8.54999 1.17648C9.76999 1.17648 10.94 1.67228 11.8027 2.5548C12.6654 3.43733 13.15 4.63429 13.15 5.88237C13.15 7.13044 12.6654 8.3274 11.8027 9.20993C10.94 10.0925 9.76999 10.5882 8.54999 10.5882Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_70_78">
          <rect
            width="23"
            height="20"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconUser;
