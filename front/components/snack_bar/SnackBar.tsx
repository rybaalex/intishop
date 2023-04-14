import React from "react";

import Styles from "./SnackBar.module.scss";
import { Button } from "components/button";

export interface SnackBarI {
  show: boolean;
  message?: string;
  btnFunc?: () => void;
  btnTitle?: string;
  hideFunc?: () => void;
  iconSrc?: string;
  customeChildren?: string | React.ReactElement | React.ReactNode;
  width?: number;
  position?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
}

const SnackBar: React.FC<SnackBarI> = ({
  show,
  message,
  btnFunc,
  btnTitle,
  hideFunc,
  iconSrc,
  customeChildren,
  width = 400,
  position = "bottomRight",
}) => {
  const isHideClass = !show ? Styles.hide : "";
  const positionStyle = {
    bottomRight: { bottom: 19, right: 16 },
    bottomLeft: { bottom: 19, left: 16 },
    topRight: { top: 19, right: 16 },
    topLeft: { top: 19, left: 16 },
  };

  return (
    <div
      className={`${Styles.container} ${isHideClass}`}
      tabIndex={0}
      onClick={hideFunc}
      style={{ width, ...positionStyle[position] }}
    >
      {customeChildren ? (
        customeChildren
      ) : (
        <>
          <div className={Styles.message_container}>
            {iconSrc && (
              <img src={iconSrc} alt="message_icon" className={Styles.icon} />
            )}
            <span className={Styles.message}>{message}</span>
          </div>

          {btnTitle && (
            <Button
              onClick={(evt) => {
                evt && evt.stopPropagation();
                btnFunc && btnFunc();
              }}
            >
              {btnTitle}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export { SnackBar };
