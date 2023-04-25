import {FC} from "react";
import {IOfferItem} from "./Banners.d";
import {ButtonContainer} from "components/button";
import {servicePath} from "utils/bootstrap";

const ButtonOfferItem: FC<IOfferItem> = (
    {
        title = "",
        url = "",
    }
) => {
    return (
        <ButtonContainer color={"black"} theme={"chips"} link={servicePath+url}>{title}</ButtonContainer>

    )
}

export {ButtonOfferItem}