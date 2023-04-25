import {IResponse} from "../../../types/response";

interface IBannerResponse extends Omit<IResponse, "response"> {
    response?: IBannerItem;
}

interface IBannerItem {
    description?: string;
    offers?: IOfferItem[],
    button?: IButtonItem[],
    sliders?: IImagesBannerItem[]
}

interface IImagesBannerItem {
    title: string;
    url: string;
    sort?: number;
    published?: boolean
    image?: string
}

interface IButtonItem {
    title: string;
    url: string;
    sort?: number;
    published?: boolean
}

interface IOfferItem {
    title: string;
    url: string;
    sort?: number;
    description?: string;
    published?: boolean
}

interface IBannerSlice {
    bannerState: IBannerResponse
}

export {IBannerResponse, IBannerItem, IOfferItem, IButtonItem, IImagesBannerItem, IBannerSlice}