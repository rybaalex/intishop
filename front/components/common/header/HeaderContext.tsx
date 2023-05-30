import Styles from "components/common/header/Header.module.scss";
import { FC, useEffect } from "react";
import { Button } from "components/button";
import { Catalog } from "components/common/header/catalog";
import { Logo } from "components/common/header/logo/Logo";
import SearchContainer from "components/common/header/search/SearchContainer";
import { AuthContainer } from "components/common/header/auth/AuthContainer";
import { HeartIcon } from "components/icons";
import { MiniCart } from "./minicart";
import { Container } from "components/common";
import { useCheckAuth } from "store/hooks/useCheckAuth";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuth, setAuthData, setAuthIdentity } from "components/common/header/auth/AuthSlice";
import { useGetIdentity } from "store/hooks/useGetIdentity";
import { IAuthUser } from "types/Auth";
import { catalogPath } from "utils/bootstrap";
import { getMenuShow, setMenuShow } from "components/common/header/catalog/MenuShowSlice";

const HeaderContext = () => {
  /*
    const [stateMenu, toggleMenu] = useToggle(false);
  */
  const showMenu = useAppSelector(getMenuShow);
  const { getCheckAuth } = useCheckAuth();
  const { getIdentity } = useGetIdentity();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(getAuth);

  useEffect(() => {
    getCheckAuth().then((data) => {
      dispatch(setAuthIdentity({ identity: data }));
      data && getIdentity("get_me").then((auth_data: { data: IAuthUser }) => {
        dispatch(setAuthData({ data: auth_data.data }));
      });
    });
  }, []);


  const HamburgerMenu: FC = () => {
    return <div className={Styles.hamburgerMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>;
  };

  return (<Container className={Styles.section_header_context}>
      <Container className="wrapper width100" el={"div"}>
        <div className={Styles.container_header}>
          <div className={Styles.header__menu}
               onMouseEnter={() => dispatch(setMenuShow({ isShow: true }))}
               onMouseLeave={() => dispatch(setMenuShow({ isShow: false }))}
          >
            <Button
              theme={"chips"}
              link={catalogPath}
              color={"primary"}
              textAlign={"justify"}
              customClass={`${Styles.animated_svg} ${showMenu ? Styles.active : ""}`}
            >Каталог <HamburgerMenu /></Button>
            <Catalog isShowMenu={showMenu} />
          </div>
          <div className={Styles.header}>

            <div className={Styles.header__logo}>
              <Logo />
            </div>
            <SearchContainer />
            <div className={Styles.header__contacts}>
              {auth.identity ? <span>Привет</span> : <AuthContainer />}
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