import { ReactNode } from "react";
import { Link } from "react-router-dom";


const SecondaryButton = ({ children, parent, child, to }: { children: ReactNode, parent?: string, child?: string, to?: string }) => {
    return (
        <div className=''>
            <div className={`relative ${parent} w-fit  border border-transparent bg-gradient-to-r from-[#B463FF] to-[#369CFF] [background-clip:padding-box] p-[1px]  flex justify-center items-center`}>
                <Link to={to ?? "#"} className={`bg-black flex ${child} items-center justify-center p-2 active:scale-95 transition-all duration-300`}>
                    {children}
                </Link>
            </div>
        </div >
    );
};

export default SecondaryButton;
