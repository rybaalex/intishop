import Styles from "./Auth.module.scss";
import { Button } from "components/button";
import { SuccessIcon, UserIcon } from "components/icons";
import React, { FC, useEffect, useState } from "react";
import { useModal } from "store/hooks/useModal";
import { Modal } from "components/modal";
import { AuthForm } from "components/common/header/auth/AuthForm";
import { SnackBar } from "components/snack_bar";

interface IStateSnackBar {
  isShow: boolean,
  message: string,
  svgIcon: React.SFC<React.SVGProps<SVGSVGElement>>;
}

const AuthContainer: FC = () => {
  const { isShow, toggle } = useModal();
  const [snackBar, setSnackBar] = useState<IStateSnackBar>({
    isShow: false,
    message: undefined,
    svgIcon: SuccessIcon
  });

  useEffect(() => {
    snackBar.isShow && setTimeout(() => {
      setSnackBar(
        {
          isShow: false,
          message: undefined,
          svgIcon: SuccessIcon
        }
      );
    }, 5000);

  }, [snackBar.isShow]);
  const handleSingUpSuccess = () => {
    setSnackBar({ isShow: true, message: "Регистрация прошла успешно", svgIcon: SuccessIcon });
    toggle();
  };
  const handleSingInSuccess = () => {
    setSnackBar({ isShow: true, message: "Добро пожаловать", svgIcon: SuccessIcon });
    toggle();
  };
  return (
    <div className={Styles.login_container}>
      <Button
        theme={"auth"}
        color={"auth"}
        type={"button"}
        onClick={toggle}
      >
        <span>Вход</span> <UserIcon />
      </Button>
      <Modal
        isShow={isShow}
        hide={toggle}
        theme={"auth"}
        modalContent={<AuthForm
          singUpSuccess={() => handleSingUpSuccess()}
          singInSuccess={() => handleSingInSuccess()} />}
        headerText={""}
      />
      <SnackBar
        position={"topRight"}
        show={snackBar.isShow}
        message={snackBar.message}
        Icon={snackBar.svgIcon} />
    </div>
  );
};

export { AuthContainer };