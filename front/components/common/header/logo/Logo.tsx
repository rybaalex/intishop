import { Link } from "components/link";
import Styles from "./Logo.module.scss";
import { uploadsPath } from "utils/bootstrap";

const Logo = () => {
  return <Link url={"/"} classLink={Styles.logo_block}>
    <img title={"Логотип"} src={uploadsPath + "/site/logo.svg"} />
  </Link>;
};
export { Logo };