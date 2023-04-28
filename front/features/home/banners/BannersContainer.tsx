import { FC } from "react";
import Styles from "./Banners.module.scss";
import { Slider } from "components/slider";
import { IResponse } from "types/response";

interface IBannerData {
  banners: IResponse;
  gifts: IResponse;
}

const BannersContainer: FC<IBannerData> = ({ banners, gifts }) => {
  return <div className={Styles.banner_container}>
    <div className={Styles.left_banner}>
      <Slider response={banners.response as []} />
    </div>
    <div className={Styles.right_banner}>
      <div className={Styles.label_block}><span>Подарок на этой неделе!</span><p>Подробнее...</p></div>
      <Slider
        response={gifts.response as []}
        pauseOnMouseEnter={false}
        recurse={"moke"}
        pagination={false}
        timer={false}
        label={true}
        label_text={"Подарок"}
      />
    </div>
  </div>;
};

export { BannersContainer };