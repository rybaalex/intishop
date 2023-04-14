import React, { FC } from "react";

const PassIcon: FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M19.1,14L17,14.7v-2.3c0-0.6-0.4-1-1-1s-1,0.4-1,1v2.3L12.9,14c-0.5-0.2-1.1,0.1-1.3,0.6c-0.2,0.5,0.1,1.1,0.6,1.3l2.1,0.7
		l-1.3,1.8c-0.3,0.4-0.2,1.1,0.2,1.4c0.2,0.1,0.4,0.2,0.6,0.2c0.3,0,0.6-0.1,0.8-0.4l1.3-1.8l1.3,1.8c0.2,0.3,0.5,0.4,0.8,0.4
		c0.2,0,0.4-0.1,0.6-0.2c0.4-0.3,0.5-0.9,0.2-1.4l-1.3-1.8l2.1-0.7c0.5-0.2,0.8-0.7,0.6-1.3C20.2,14.1,19.7,13.8,19.1,14z"/>
      <path d="M8.1,14L6,14.7v-2.3c0-0.6-0.4-1-1-1s-1,0.4-1,1v2.3L1.9,14c-0.5-0.2-1.1,0.1-1.3,0.6c-0.2,0.5,0.1,1.1,0.6,1.3l2.1,0.7
		l-1.3,1.8c-0.3,0.4-0.2,1.1,0.2,1.4C2.5,19.9,2.7,20,2.9,20c0.3,0,0.6-0.1,0.8-0.4L5,17.8l1.3,1.8C6.5,19.9,6.8,20,7.1,20
		c0.2,0,0.4-0.1,0.6-0.2c0.4-0.3,0.5-0.9,0.2-1.4l-1.3-1.8l2.1-0.7c0.5-0.2,0.8-0.7,0.6-1.3C9.2,14.1,8.7,13.8,8.1,14z"/>
      <path d="M31.4,14.6c-0.2-0.5-0.7-0.8-1.3-0.6L28,14.7v-2.3c0-0.6-0.4-1-1-1s-1,0.4-1,1v2.3L23.9,14c-0.5-0.2-1.1,0.1-1.3,0.6
		c-0.2,0.5,0.1,1.1,0.6,1.3l2.1,0.7l-1.3,1.8c-0.3,0.4-0.2,1.1,0.2,1.4c0.2,0.1,0.4,0.2,0.6,0.2c0.3,0,0.6-0.1,0.8-0.4l1.3-1.8
		l1.3,1.8c0.2,0.3,0.5,0.4,0.8,0.4c0.2,0,0.4-0.1,0.6-0.2c0.4-0.3,0.5-0.9,0.2-1.4l-1.3-1.8l2.1-0.7C31.3,15.7,31.6,15.2,31.4,14.6z
		"/>
    </svg>
  );
};

export { PassIcon };
