import React, { FC } from "react";


const ArrowIcon: FC = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={"15px"}
      height={"15px"}
      viewBox="0 0 256 512"
      {...props}
    >
      <path
        d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"></path>
    </svg>
  );
};

export { ArrowIcon };