"use client"

import Lottie from 'lottie-react';
// import animatedLoaing from "@/assets/animation/loading.json"
import animatedLoaing from "../../assets/animation/loading.json"

const Loading = () => {
    return (
        <div className='flex justify-center items-center w-full h-[50vh]'>
            <Lottie className="" animationData={animatedLoaing} loop={true} />
        </div>
    );
};

export default Loading;