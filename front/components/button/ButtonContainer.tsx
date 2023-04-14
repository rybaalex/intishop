import React, {FC} from "react";
import {useRouter} from "next/router";

import {ButtonI} from "./Button.d";

import Styles from "./Button.module.scss";

const ButtonContainer: FC<ButtonI> = ({
                                          children,
                                          type = "button",
                                          disabled = false,
                                          onClick = () => {
                                          },
                                          color = "white",
                                          theme = 'square',
                                          link,
                                          ...attrs
                                      }) => {
    const router = useRouter();

    const onClickBtn =
        () => (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (link) {
                router?.push(`${link}`).then();
            } else return onClick(evt);
        };
    const resTheme = theme + '_' + color;
    return (
        <button
            {...attrs}
            type={type}
            disabled={disabled}
            onClick={onClickBtn()}
            className={`${Styles[resTheme]}`}
        >
            {children}
        </button>
    );
};

export {ButtonContainer};
