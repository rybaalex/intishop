import { FC } from "react";
import Styles from "./Banners.module.scss";
import { Slider } from "components/slider";
import { IResponse } from "types/response";

interface IBannerData {
  banners: IResponse;
}

const BannersContainer: FC<IBannerData> = ({ banners }) => {
  return <div className={Styles.banner_container}>
    <div className={Styles.left_banner}>
      <Slider response={banners.response as []} />
    </div>
  </div>;
};

export { BannersContainer };