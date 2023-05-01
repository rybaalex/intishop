import React, { FC } from "react";
import { Container } from "components/common/container";
import Styles from "./Header.module.scss";
import { StaticPageContainer } from "components/common/header/static_page/StaticPageContainer";

const HeaderContainer: FC = () => {

    return (
      <Container className={Styles.section_header}>
        <Container className="wrapper" el={"div"}>
          <StaticPageContainer />
        </Container>
      </Container>
    );
  }
;

export { HeaderContainer };
