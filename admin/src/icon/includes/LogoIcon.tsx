import * as React from "react";

function LogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={"42px"}
      height={"42px"}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <circle cx="10" cy="19" r="1.5" stroke="#000000"/>
        <circle cx="17" cy="19" r="1.5" stroke="#000000"/>
        <path d="M3.5 4H5.5L9.00446 15H17" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.22445 12.5L6.29862 6.5H18.8063C19.1476 6.5 19.3885 6.83435 19.2806 7.15811L17.614 12.1581C17.5459 12.3623 17.3548 12.5 17.1396 12.5H8.22445Z" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
   </svg>
  );
}

export { LogoIcon };
