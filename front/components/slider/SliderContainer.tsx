import React, { FC, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { IImagesBannerItem } from "features/home/banners/Banners.d";
import { SliderItem } from "components/slider/SliderItem";

interface ISlider {
  response: [];
  recurse?: string;
  pagination?: boolean;
  pauseOnMouseEnter?: boolean;
  timer?: boolean;
  label?: boolean;
  label_text?: string;
}

const SliderContainer: FC<ISlider> = ({
                                        response,
                                        recurse,
                                        pagination = true,
                                        pauseOnMouseEnter = true,
                                        timer = true
                                      }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const onAutoplayTimeLeftEmpty = () => {
  };
  return (<Swiper
    pagination={pagination ? {
      clickable: true
    } : false}
    mousewheel={{ forceToAxis: true, releaseOnEdges: true, sensitivity: 1 }}
    modules={[Mousewheel, Pagination, Autoplay]}
    onAutoplayTimeLeft={timer ? onAutoplayTimeLeft : onAutoplayTimeLeftEmpty}
    autoplay={{
      delay: 5000,
      disableOnInteraction: true,
      pauseOnMouseEnter: pauseOnMouseEnter
    }}
    loop={true}
  >
    {response?.length > 0 && response.map((e: IImagesBannerItem, i) => {
      return (<SwiperSlide key={i}>
        <SliderItem {...e}
                    recurse={recurse}
        /></SwiperSlide>);
    })}


    <div className="autoplay-progress" slot="container-end">
      <svg viewBox="0 0 48 48" ref={progressCircle}>
        <circle cx="24" cy="24" r="20"></circle>
      </svg>
      <span ref={progressContent}></span>
    </div>
  </Swiper>);
};
export { SliderContainer };