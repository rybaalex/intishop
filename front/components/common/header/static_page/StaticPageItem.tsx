import { INavItem } from "types/nav.d";
import { FC } from "react";
import { Link } from "components/link";

const StaticPageItem: FC<INavItem> = ({
                                        title = "",
                                        url = ""
                                      }) => {
  return (<Link url={url}>
    <li key={url}>{title}</li>
  </Link>);
};

export { StaticPageItem };