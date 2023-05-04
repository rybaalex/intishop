import React, { FC } from "react";

import Styles from "./SnackBar.module.scss";
import { Button } from "components/button";

export interface ISnackBar {
  show: boolean;
  message?: string;
  btnFunc?: () => void;
  btnTitle?: string;
  hideFunc?: () => void;
  theme?: "success" | "error" | "warning";
  Icon?: React.SFC<React.SVGProps<SVGSVGElement>>;
  customChildren?: string | React.ReactElement | React.ReactNode;
  width?: number;
  position?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
}

const SnackBar: FC<ISnackBar> = ({
                                   show,
                                   message,
                                   btnFunc,
                                   btnTitle,
                                   hideFunc,
                                   theme = "success",
                                   Icon,
                                   customChildren,
                                   width = 400,
                                   position = "bottomRight"
                                 }) => {
  const isHideClass = !show ? Styles.hide : "";
  const positionStyle = {
    bottomRight: { bottom: 19, right: 16 },
    bottomLeft: { bottom: 19, left: 16 },
    topRight: { top: 19, right: 16 },
    topLeft: { top: 19, left: 16 }
  };

  return (
    <div
      className={`${Styles.container} ${isHideClass} ${Styles[theme]}`}
      tabIndex={0}
      onClick={hideFunc}
      style={{ width, ...positionStyle[position] }}
    >
      {customChildren ? (
        customChildren
      ) : (
        <>
          <div className={Styles.message_container}>
            <Icon />
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
