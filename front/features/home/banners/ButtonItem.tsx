import {FC} from "react";
import {IButtonItem} from "./Banners.d";
import {ButtonContainer} from "components/button";

const ButtonItem: FC<IButtonItem> = (
    {
        title = "",
        url = "",
    }
) => {
    return (
        <ButtonContainer color={"black"} theme={"square"} link={url}>{title}</ButtonContainer>

    )
}

export {ButtonItem}