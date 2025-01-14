
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotLight from '../../ui/demo';
const FeaturenmentsCard = ({ image, tournaments, slug }: { image: string, tournaments: string, slug: string }) => {
    return (
        <div className="rounded-md p-[2px] max-w-[290px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[420px] 2xl:max-w-[600px] css_bg w-full css_clip_path_Slider mx-auto">
            <div className='2xl:max-w-[598px] max-w-[288px] sm:max-w-[298px] md:max-w-[378px] lg:max-w-[418px] w-full bg-black rounded-md group overflow-hidden css_clip_path_Slider'>
                <div className="overflow-hidden ">
                    <img src={image} alt='sdf' width={1280} height={800} className='w-full group-hover:scale-105 transition-all duration-300 lg:h-[400px] md:h-[370px] sm:h-[350px] h-[230px]' />
                </div>
                <SpotLight>
                    <div className='px-4 py-5'>
                        <Link to={`/featured-tournament/${slug}`} >
                            <p className='uppercase text-2xl font-semibold'>{tournaments}</p>
                            <p className='text-sm text-primary_highlighted flex items-center gap-2'><span>View Tournaments </span> <ArrowRight className='w-4' /> </p>
                        </Link>
                    </div>
                </SpotLight>
            </div>
        </div>

    );
};

export default FeaturenmentsCard;