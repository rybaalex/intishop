import {FC} from "react";
import {IImagesBannerItem} from "features/home/banners/Banners.d";
import {imagesBannerPath} from "utils/bootstrap";

const SliderItem: FC<IImagesBannerItem> = ({
                                               title,
                                               image
                                           }) => {
    return (<img src={imagesBannerPath + image} alt={title}/>)
}

export {SliderItem}