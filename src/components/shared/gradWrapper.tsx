import { ReactNode } from "react";


const GradWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className=''>
            <div className='relative  w-fit border border-transparent bg-gradient-to-r from-[#B463FF] to-[#369CFF] [background-clip:padding-box] p-[1px] rounded-[8px] flex justify-center items-center'>
                <div className='bg-black rounded-[8px] flex items-center justify-center p-1'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GradWrapper;
