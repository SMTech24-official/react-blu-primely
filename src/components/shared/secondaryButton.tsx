import { ReactNode } from "react";


const SecondaryButton = ({ children, parent, child }: { children: ReactNode, parent?: string, child?: string }) => {
    return (
        <div className=''>
            <div className={`relative ${parent} w-fit  border border-transparent bg-gradient-to-r from-[#B463FF] to-[#369CFF] [background-clip:padding-box] p-[1px]  flex justify-center items-center`}>
                <button className={`bg-black flex ${child} items-center justify-center p-2 active:scale-95 transition-all duration-300`}>
                    {children}
                </button>
            </div>
        </div >
    );
};

export default SecondaryButton;
