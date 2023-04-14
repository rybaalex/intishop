import {INavItem} from "types/nav.d";
import {FC} from "react";
import {Link} from "components/link";

const StaticPageContainer: FC<INavItem> = ({
                                           title = '',
                                           url=''
                                       }) => {
    return (<Link url={url}>
        <li>{title}</li>
    </Link>)
}

export {StaticPageContainer}