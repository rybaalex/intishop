import Styles from "./Success.module.scss";
import { SuccessIcon } from "components/icons";
import { Container } from "components/common";
import { Button } from "components/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

const SuccessContainer = () => {
  const [counter, setCounter] = useState(5);
  const router= useRouter()
  useEffect(() => {
    counter===0&&router.push("/");
   const timer= counter>0 && setInterval(() => {
      setCounter((prevCounter)=>prevCounter-1);
    }, 1000);

    return ()=>clearInterval(timer)
  }, [counter]);
  return (<Container className="wrapper no_margin width100" el={"div"}>
    <div className={Styles.success__block}>
      <div className={Styles.success__item}>
        <div className={Styles.success__container}>
          <SuccessIcon />

        </div>
        <p className={Styles.title}>Успех</p>
        <p className={Styles.content}>Вы успешно активировали аккаунт</p>
        <Button theme={"chips"} color={"primary"} children={"На главную "+counter+"с"} link={"/"}/>
      </div>
    </div>
  </Container>);
};

export { SuccessContainer };