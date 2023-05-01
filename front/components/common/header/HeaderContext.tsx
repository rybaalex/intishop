import Styles from "components/common/header/Header.module.scss";
import { FC } from "react";
import { useToggle } from "store/hooks/useToggle";
import { Button } from "components/button";
import { Catalog } from "components/common/header/catalog";
import { Logo } from "components/common/header/logo/Logo";
import SearchContainer from "components/common/header/search/SearchContainer";
import { AuthContainer } from "components/common/header/auth/AuthContainer";
import { HeartIcon } from "components/icons";
import { MiniCart } from "./minicart";
import { Container } from "components/common";

const HeaderContext = () => {
  const [stateMenu, toggleMenu] = useToggle(false);

  const HamburgerMenu: FC = () => {
    return <div className={Styles.hamburgerMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>;
  };
  return (<Container className={Styles.section_header_context}>
      <Container className="wrapper" el={"div"}>
        <div className={Styles.container_header}>
          <div className={Styles.header__menu}
               onMouseEnter={() => toggleMenu()}
               onMouseLeave={() => toggleMenu()}
          >
            <Button
              theme={"chips"}
              link={"catalog"}
              color={"primary"}
              textAlign={"justify"}
              customClass={`${Styles.animated_svg} ${stateMenu ? Styles.active : ""}`}
            >Каталог <HamburgerMenu /></Button>
            <Catalog isShowMenu={stateMenu} />
          </div>
          <div className={Styles.header}>

            <div className={Styles.header__logo}>
              <Logo />
            </div>
            <SearchContainer />
            <div className={Styles.header__contacts}>
              <AuthContainer />
              <div className={Styles.block_favourites}>
                <HeartIcon />
                <div className={Styles.count}><span>9+</span></div>
              </div>
              <div className={Styles.separatop}></div>
            </div>
            <div>
              <MiniCart />
            </div>
          </div>
        </div>
      </Container></Container>

  );
};

export { HeaderContext };