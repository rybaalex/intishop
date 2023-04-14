import React, { FC, ReactNode } from "react";
import Link from "next/link";

interface ILink {
  children: ReactNode;
  url?: string;
  classLink?: string;
  onClick?: ()=>void;
}
const LinkContainer: FC<ILink> = ({ children, url = "", classLink = "", onClick }) => {
  return (
    <Link href={url} as={url}>
      <a className={classLink} onClick={onClick}>{children}</a>
    </Link>
  );
};

export { LinkContainer };
