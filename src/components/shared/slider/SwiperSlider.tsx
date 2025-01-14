
// Import Swiper React components
import SwiperCore from 'swiper';
import { Swiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';


// import 'swiper/css/bundle';

// import required modules
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import useDeviceSize from '../../../hooks/useDeviceSize';

export default function SwiperSlider({ children, spaceSm, spaceMd, spaceLg, }: { children: React.ReactNode, spaceSm: number, spaceMd: number, spaceLg: number }) {
    SwiperCore.use([Autoplay]);

    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
    const { deviceSize } = useDeviceSize()
    return (
        <div className='relative mx-auto max-w-[1900px]'>
            <Swiper className="mySwiper" slidesPerView={deviceSize === 1 ? spaceSm : deviceSize === 2 ? spaceMd : deviceSize === 3 ? spaceLg : 3}
                spaceBetween={deviceSize === 1 ? 10 : deviceSize === 2 ? 15 : deviceSize === 3 ? 20 : 30}
                centeredSlides={true}
                autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                    stopOnLastSlide: false,

                }}
                loop={true}
                // spaceBetween={30}
                onSwiper={(swiper) => setSwiperInstance(swiper)} // Capture the swiper instance when initialized
            >
                {
                    children
                }
            </Swiper>
            {/* Custom navigation buttons */}
            <div className='ml-auto max-w-[150px] md:container relative  sm:-translate-y-[260px] lg:-translate-y-[260px] z-20 2xl:-translate-y-[270px] '>
                <div className='absolute top-0 left-0 z-20'>
                    {/* Left (Previous) button */}
                    <button className={` p-3 rounded-full bg-primary_highlighted`}
                        onClick={() => swiperInstance?.slidePrev()}>
                        <ChevronLeft className='fill-transparent text-white relative ' />
                    </button>
                </div>

                <div className='absolute top-0 right-0 z-20'>
                    {/* Right (Next) button */}
                    <button className={`$ p-3 rounded-full bg-primary_highlighted`}
                        onClick={() => swiperInstance?.slideNext()}>
                        <ChevronRight className='fill-transparent text-white relative ' />
                    </button>
                </div>
            </div>
        </div>
    );
}
