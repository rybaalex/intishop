import {FC, useEffect} from "react";
import Styles from "./Banners.module.scss"
import {ButtonOfferItem} from "features/home/banners/ButtonOfferItem";
import {ButtonItem} from "features/home/banners/ButtonItem";
import {Slider} from "components";
import {useAppSelector} from "store/hooks";
import {getBanner} from "features/home/banners/BannerSlice";
import {filter_publish} from "utils/helpers";

const Banners: FC = () => {
    const bannerData = useAppSelector(getBanner)

    useEffect(() => {
    }, [bannerData])
    return <div className={Styles.banner_container}>
        <div className={Styles.left_banner}>
            <div className={Styles.insidePadding}>
                <div className={Styles.title}>{bannerData && bannerData.response.description}</div>
                <div className={Styles.block_orders}>
                    {bannerData && !bannerData?.hasError && filter_publish(bannerData.response.offers).map((e, i) => {
                        return <ButtonOfferItem {...e} key={i}/>
                    })}
                </div>
                <div className={Styles.block_button}>
                    {bannerData && !bannerData?.hasError && filter_publish(bannerData.response.button).map((e, i) => {
                        return <ButtonItem {...e} key={i}/>
                    })}
                </div>
            </div>
        </div>
        <div className={Styles.right_banner}>
            <Slider sliders={bannerData && bannerData.response.sliders}/>
        </div>
    </div>
}
export {Banners}