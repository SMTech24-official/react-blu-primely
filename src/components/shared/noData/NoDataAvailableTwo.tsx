import Lottie from 'lottie-react';
import loading from "../../../assets/animation/Animation - 1735992574210.json";
// import loading from "@/assets/animation/Animation - 1735992574210.json";



const NoDataAvailable = ({ text }: { text: string }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-4 min-h-[30vh] '>
            <Lottie className="h-[250px]" animationData={loading} loop={true} />
            <p className='capitalize text-lg font-semibold css_bg_Text'>{text}</p>
        </div>
    );
};

export default NoDataAvailable;