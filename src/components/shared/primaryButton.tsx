import { ReactNode } from "react";
import { Link } from "react-router-dom";


const PrimaryButton = ({ children, parent, child, root, to }: { children: ReactNode, parent?: string, child?: string, root?: string, to?: string }) => {
    if (to) {
        return (
            <Link to={to} className={root}>
                <div className={`relative hover:cursor-pointer active:scale-95 transition-all duration-300 ${parent} w-fit border border-transparent bg-gradient-to-r from-[#8300C1] to-[#369CFF] [background-clip:padding-box] p-[1px] rounded-[8px] flex justify-center items-center `
                }>
                    <div className={`p-2 ${child} `}>
                        {children}
                    </div>
                </div >
            </Link >

        );
    }
    return (
        <div className={root}>
            <div className={`relative hover:cursor-pointer active:scale-95 transition-all duration-300 ${parent} w-fit border border-transparent bg-gradient-to-r from-[#8300C1] to-[#369CFF] [background-clip:padding-box] p-[1px] rounded-[8px] flex justify-center items-center `
            }>
                <div className={`p-2 ${child} `}>
                    {children}
                </div>
            </div >
        </ div>

    );
};

export default PrimaryButton;
