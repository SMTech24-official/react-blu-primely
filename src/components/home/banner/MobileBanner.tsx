/* eslint-disable @typescript-eslint/no-explicit-any */



// import required modules
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




export default function MobileBanner({ banner }: { banner: any }) {
    SwiperCore.use([Autoplay]);
    const [currentImage, setCurrentImage] = useState<number>(banner[0]);
    return (
        <>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                modules={[EffectFade]}
                className="mySwiper"
                autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                    stopOnLastSlide: false
                }}
                onSlideChange={(swiper) => {
                    // Set the current image when the slide changes
                    setCurrentImage(swiper.realIndex);
                }}
            >
                {
                    banner.map((data: any, idx: any) => <SwiperSlide key={idx}>
                        <img src={data} alt="Image 6" width={1200} height={1200} className='object-fill relative w-full h-[300px] sm:h-[500px]' />

                    </SwiperSlide>)
                }
            </Swiper >
            <div className={`flex w-full`}>
                {
                    banner?.map((data: any, idx: any) => <div key={idx}>
                        <img src={data} alt="Image 6" width={1200} height={1200} className={`object-cover relative w-full h-[120px] ${currentImage === (idx) ? "border opacity-100" : " opacity-50"}`} />
                    </div>)
                }
            </div>
        </>
    );
}
