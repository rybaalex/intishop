import { useRouter } from "next/dist/client/router";
import Styles from "./Error.module.scss";
import { SuccessIcon } from "components/icons";
import { Container } from "components/common";
import { FC } from "react";

const ErrorContainer:FC = () => {
  const router = useRouter();
  return (<Container className="wrapper no_margin width100" el={"div"}>
    <div className={Styles.success__block}>
      <div className={Styles.success__item}>
        <div className={Styles.success__container}>
          <SuccessIcon />
        </div>
        <p className={Styles.title}>Ошибка</p>
        <p className={Styles.content}>{router.query.message}</p>
      </div>
    </div>
  </Container>);
};

export { ErrorContainer };