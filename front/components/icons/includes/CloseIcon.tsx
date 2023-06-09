import React, { FC } from "react";

const CloseIcon: FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.99931 8.97428L13.0242 14L14 13.0257L8.9737 8L14 2.97565L13.0256 2L7.99931 7.02572L2.97439 2L2 2.97565L7.02492 8L2 13.0243L2.97439 14L7.99931 8.97428Z"
      />
    </svg>
  );
};

export { CloseIcon };
