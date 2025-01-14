import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles

// import "swiper/swiper.min.css";
import 'swiper/css';


// import required modules
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import useDeviceSize from '../../../hooks/useDeviceSize';
import { FeaturedTournaments } from '../../../lib/fakeData/featuredTournaments';
import FeaturenmentsCard from '../../allCards/featuredTournmentsCards/FeaturenmentsCard';

export default function FeaturedSlider() {
    SwiperCore.use([Autoplay]);

    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
    const { deviceSize } = useDeviceSize()
    return (
        <div className='relative mx-auto max-w-[1900px]'>
            <Swiper className="mySwiper" slidesPerView={deviceSize ?? 3}
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
                    FeaturedTournaments?.map((data, idx) => <SwiperSlide key={idx} className=''><FeaturenmentsCard slug={data.slug} image={data.imageSrc} tournaments={data.game} /></SwiperSlide>)
                }
            </Swiper>
            {/* Custom navigation buttons */}
            <div className='container relative -translate-y-[180px] sm:-translate-y-[260px] lg:-translate-y-[260px] z-20 2xl:-translate-y-[270px] '>
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
