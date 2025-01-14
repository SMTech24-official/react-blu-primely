/* eslint-disable @typescript-eslint/no-explicit-any */
// https://buildui.com/recipes/spotlight

import { ReactNode, useRef, useState } from 'react';

export default function SpotLight({ children }: {
    children: ReactNode
}) {
    const boxWrapper = useRef(null);
    const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 });
    const handleMouemove = ({ currentTarget, clientX, clientY }: { currentTarget: any, clientX: any, clientY: any }) => {
        const { left, top } = currentTarget.getBoundingClientRect();

        const x = clientX - left;
        const y = clientY - top;

        setOverlayColor({ x, y });
    };

    return (
        <>
            <div
                onMouseMove={handleMouemove}
                ref={boxWrapper}
                className={`group relative rounded-lg overflow-hidden`}
            >
                <div
                    className='pointer-events-none absolute opacity-0 z-50 rounded-lg w-full h-full group-hover:opacity-100  transition duration-300 '
                    style={{
                        background: `
            radial-gradient(
              250px circle at ${overlayColor.x}px ${overlayColor.y}px,
              rgba(255, 255, 255, 0.137),
              transparent 80%
            )
          `,
                    }}
                />

                {children}
            </div>
        </>
    );
}