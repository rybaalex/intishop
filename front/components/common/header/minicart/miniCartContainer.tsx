import { CartIcon } from "components/icons";
import Styles from "./MiniCart.module.scss";
import { useModal } from "store/hooks/useModal";
import { Modal } from "components/modal";
import React from "react";

const MiniCartContainer = () => {
  const { isShow, toggle } = useModal();

  return (<div className={Styles.miniCartContainer} onClick={toggle}>
      <div className={Styles.cartCount}><CartIcon /><span>9+</span></div>
      <Modal
        isShow={isShow}
        hide={toggle}
        modalContent={<div>Cart</div>}
        headerText={"Корзина заказов"}
        theme={"cart"}
      />
    </div>
  );
};

export { MiniCartContainer };