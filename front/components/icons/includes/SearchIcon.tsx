import * as React from "react";

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 18.6C15.9212 18.6 19.1 15.4212 19.1 11.5C19.1 7.57878 15.9212 4.4 12 4.4C8.07878 4.4 4.9 7.57878 4.9 11.5C4.9 15.4212 8.07878 18.6 12 18.6ZM12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z"
      />
      <path fillRule="evenodd" clipRule="evenodd" d="M18 18L21 21L18 18Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1161 17.1161C17.6043 16.628 18.3957 16.628 18.8839 17.1161L21.8839 20.1161C22.372 20.6043 22.372 21.3957 21.8839 21.8839C21.3957 22.372 20.6043 22.372 20.1161 21.8839L17.1161 18.8839C16.628 18.3957 16.628 17.6043 17.1161 17.1161Z"
      />
    </svg>
  );
}

export { SearchIcon };
