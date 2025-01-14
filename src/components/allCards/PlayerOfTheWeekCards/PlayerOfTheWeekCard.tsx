import trophy from "@/assets/player/fi_8415487.png";
import trophy2 from "@/assets/player/Group (1).png";
import { Gift } from 'lucide-react';
import SpotLight from "../../ui/demo";

const PlayerOfTheWeekCard = ({ name, xp, date, credits, avater, rank }: { name: string, xp: string, date: string, credits: number, rank: number, avater: string }) => {
    return (
        <div className="relative">
            <div>
                {
                    rank === 1 ? <img alt='' src={trophy} width={100} height={100} className='absolute  w-14 -right-4 -top-5 z-20' /> : <div className="absolute  w-14 -right-4 -top-5 z-20">
                        <img alt='' src={trophy2} width={100} height={100} className='w-14' />
                        <p className="absolute z-30 top-[12px] right-[13px]  text-lg font-semibold border-2 px-2 rounded-full aspect-square">{rank}</p>
                    </div>
                }

            </div>
            <SpotLight>
                <div className=' p-[1px] css_bg relative rounded-xl cursor-pointer group'>

                    <div className=' bg-black relative p-6 rounded-xl'>
                        <p className='text-2xl font-semibold mb-2'>{name}</p>
                        <p>{xp} earned {date}</p>
                        <div className='flex items-center gap-2 text-primary_highlighted mt-4 group-hover:animate-pulse'>
                            <Gift className=' w-8 h-8 ' />
                            <p className='text-lg font-semibold'>+{credits} Credits</p>
                        </div>
                        <div className='absolute  bg-gradient-to-t from-black via-black/50 to-transparent w-[calc(100%+8px)] h-[400px]  -bottom-4 -left-1' />

                        <div className='flex justify-end items-end z-20 mt-2'>
                            <div className='p-[2px] w-[234px] css_clip_path h-[234px] css_bg'>
                                <img src={avater} alt={`Image of ${name}`} className='w-[230px] h-[230px] object-cover css_clip_path' width={200} height={200} />
                            </div>
                        </div>
                    </div>
                </div>
            </SpotLight>
        </div>


    );
};

export default PlayerOfTheWeekCard;