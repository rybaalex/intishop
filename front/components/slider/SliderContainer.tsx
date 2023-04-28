import React, {FC, useRef} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Mousewheel, Autoplay} from "swiper";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import {IImagesBannerItem} from "features/home/banners/Banners.d";
import {SliderItem} from "components/slider/SliderItem";

interface ISlider {
    sliders: IImagesBannerItem[];
}

const SliderContainer: FC<ISlider> = ({sliders}) => {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (<Swiper
        pagination={{
            clickable: true,
        }}
        mousewheel={{forceToAxis: true, releaseOnEdges: true, sensitivity: 1}}
        modules={[Mousewheel, Pagination, Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
    >
        {sliders && sliders.map((e, i) => {
            return (<SwiperSlide key={i}><SliderItem {...e}/></SwiperSlide>)
        })}


        <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
        </div>
    </Swiper>)
}
export {SliderContainer}