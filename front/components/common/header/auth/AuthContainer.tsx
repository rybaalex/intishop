import Styles from "./Auth.module.scss";
import { Button } from "components/button";
import { UserIcon } from "components/icons";
import React, { FC } from "react";
import { useModal } from "store/hooks/useModal";
import { Modal } from "components/modal";
import { AuthForm } from "components/common/header/auth/AuthForm";

const AuthContainer: FC = () => {
  const { isShow, toggle } = useModal();
  return (
    <div className={Styles.login_container}>
      <Button
        theme={"auth"}
        color={"auth"}
        type={"button"}
        onClick={toggle}
      >
        <UserIcon /> <span>Вход</span>
      </Button>
      <Modal
        isShow={isShow}
        hide={toggle}
        theme={"auth"}
        modalContent={<AuthForm />}
        headerText={""}
      />
    </div>
  );
};

export { AuthContainer };