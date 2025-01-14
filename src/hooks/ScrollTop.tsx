import { useEffect } from "react";

const ScrollToTop = ({ children, pathname }: { children: React.ReactNode, pathname: string }) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, [pathname]);

    return children || null;
};

export default ScrollToTop