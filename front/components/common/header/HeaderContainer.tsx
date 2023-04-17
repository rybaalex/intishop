import React, { FC } from "react";
import { Container } from "components/common/container";
import Styles from "./Header.module.scss";
import { Logo } from "components/common/header/logo/Logo";
import SearchContainer from "components/common/header/search/SearchContainer";
import { HeartIcon } from "components/icons";
import { AuthContainer } from "components/common/header/auth/AuthContainer";
import { MiniCart } from "components/common/header/minicart";
import { Button } from "components/button";
import { Catalog } from "components/common/header/catalog";
import { useToggle } from "store/hooks/useToggle";
import { StaticPageContainer } from "components/common/header/static_page/StaticPageContainer";

const HamburgerMenu: FC = () => {
  return <div className={Styles.hamburgerMenu}>
    <span></span>
    <span></span>
    <span></span>
  </div>;
};
const HeaderContainer: FC = () => {
    const [stateMenu, toggleMenu] = useToggle(false);

    return (
      <Container className={Styles.section_header}>
        <Container className="wrapper" el={"div"}>
          <StaticPageContainer />
          <div className={Styles.header}>
            <div className={Styles.header__menu}
                 onMouseEnter={() => toggleMenu()}
                 onMouseLeave={() => toggleMenu()}
            >
              <Button
                theme={"chips"}
                link={"category"}
                color={"primary"}
                textAlign={"justify"}
                customClass={`${Styles.animated_svg} ${stateMenu ? Styles.active : ""}`}
              >Каталог <HamburgerMenu /></Button>
              <Catalog isShowMenu={stateMenu} />
            </div>
            <div className={Styles.header__logo}>
              <Logo />
            </div>
            <SearchContainer />
            <div className={Styles.header__contacts}>
              <div className={Styles.block_favourites}>
                <HeartIcon />
                <div className={Styles.count}><span>9+</span></div>
              </div>
              <AuthContainer />
            </div>
            <div>
              <MiniCart />
            </div>
          </div>
        </Container>
      </Container>
    );
  }
;

export { HeaderContainer };
