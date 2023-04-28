import { FC } from "react";
import { uploadsPath } from "utils/bootstrap";
import { isMobile, isTablet, isDesktop } from "react-device-detect";
import { IBanners } from "types/banners";

const SliderItem: FC<IBanners> = ({
                                    name,
                                    image,
                                    recurse = "banners"
                                  }) => {
  let images: string = "";
  if (isDesktop) {
    images = image.desktop;
  }
  if (isTablet) {
    images = image.tablet;
  }
  if (isMobile) {
    images = image.mobile;
  }
  return (<img src={uploadsPath + "/" + recurse + "/" + images} alt={name} />);
};

export { SliderItem };