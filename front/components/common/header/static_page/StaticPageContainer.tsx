import { INavItem } from "types/nav";
import { FC, useState } from "react";
import { Link } from "components/link";
import { useAppSelector } from "store/hooks";
import { getStaticPage } from "components/common/header/static_page/StaticPageSlice";
import Styles from "components/common/header/Header.module.scss";
import { StaticPageItem } from "components/common/header/static_page/StaticPageItem";
import { FormCallBack, Modal } from "components/modal";
import { useModal } from "store/hooks/useModal";

const StaticPageContainer: FC = () => {
  const staticPageData = useAppSelector(getStaticPage);
  const [staticPage] = useState<INavItem[]>(staticPageData.response);
  const { isShow, toggle } = useModal();
  const content = <FormCallBack />;
  return (<div className={Styles.top_nav}>
      <ul>
        {!staticPageData.hasError && staticPage.map(e => {
          return <StaticPageItem {...e} key={e.id} />;
        })}
      </ul>
      <div className={Styles.block_contacts}>

        <Link onClick={toggle}>
          Связаться с нами
        </Link>
      </div>
      <Modal
        isShow={isShow}
        hide={toggle}
        modalContent={content}
        headerText={"Заказать обратный звонок"}
      />
    </div>
  );
};

export { StaticPageContainer };