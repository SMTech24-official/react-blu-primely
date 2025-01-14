/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
} from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";
import SecondaryButton from "../shared/secondaryButton";

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            const direction = current! - scrollYProgress.getPrevious()!;

            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    " max-w-fit hidden z-50 sm:flex  fixed top-10 inset-x-0 mx-auto  rounded-full bg-bg_secondary pr-2 pl-8 py-2  items-center justify-center gap-8 backdrop-blur-sm css_bg_nav",
                    className
                )}
            >

                {navItems.map((navItem: any, idx: number) => (
                    <Link
                        key={`link=${idx}`}
                        to={navItem.link}
                        className={cn(
                            "text-white group "
                        )}
                    >
                        <span className=" group-hover:text-primary_highlighted transition-all duration-300">{navItem.name}</span>
                    </Link>
                ))}
                <SecondaryButton parent="rounded-full " child="rounded-full px-8 z-30 ">
                    <p className="">Join Free</p>
                </SecondaryButton>

            </motion.div>
        </AnimatePresence>
    );
};
