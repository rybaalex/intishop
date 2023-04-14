import React, { FC, useEffect, useState } from "react";
import { Container } from "components/common/container";
import { useAppSelector } from "store/hooks";
import Styles from "./Header.module.scss";
import { INavItem } from "../../../types/nav.d";
import { Logo } from "components/common/header/logo/Logo";
import { StaticPageContainer } from "components/common/header/static_page/StaticPageContainer";
import { getStaticPage } from "components/common/header/static_page/StaticPageSlice";
import { Link } from "components/link";
import { useModal } from "store/hooks/useModal";
import { FormCallBack, Modal } from "components/modal";
import SearchContainer from "components/common/header/search/SearchContainer";
import { HeartIcon } from "components/icons";
import { AuthContainer } from "components/common/header/auth/AuthContainer";
import { MiniCart } from "components/common/header/minicart";

const content = <FormCallBack />;

const HeaderContainer: FC = () => {
    const staticPageData = useAppSelector(getStaticPage);
    const [staticPage, setStaticPage] = useState<INavItem[]>(staticPageData.response);
    const { isShow, toggle } = useModal();
    useEffect(() => {
      setStaticPage(staticPage.filter(e => e.isHeader));
    }, []);
    return (
      <Container className={Styles.section_header}>
        <Container className="wrapper" el={"div"}>
          <div className={Styles.top_nav}>
            <ul>
              {!staticPageData.hasError && staticPage.map(e => {
                return <StaticPageContainer {...e} key={e._id} />;
              })}
            </ul>
            <div className={Styles.block_contacts}>

              <Link onClick={toggle}>
                Заказать звонок:
              </Link>

              <Link
                url={"tel:" + process.env.NEXT_PUBLIC_PHONE}>{process.env.NEXT_PUBLIC_PHONE}</Link>
            </div>
          </div>

          <div className={Styles.header}>
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

        <Modal
          isShow={isShow}
          hide={toggle}
          modalContent={content}
          headerText={"Заказать обратный звонок"}
        />

      </Container>
    );
  }
;

export { HeaderContainer };
