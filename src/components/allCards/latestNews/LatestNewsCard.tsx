
import { useState } from 'react'
export default function LatestNewsCard({ image, title, description, publishedDate }:
    { image: string, title: string, description: string, publishedDate: string }
) {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div
            className="relative w-full overflow-hidden rounded-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-square sm:aspect-[16/9] w-full rounded-md">
                <img
                    src={image}
                    alt="PUBG Mobile gameplay"
                    className={`object-cover border sm:aspect-[16/9] w-full rounded-md border-blue-500 transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'
                        }`}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-md " />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {title}
                    </h2>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-200 text-sm md:text-base max-w-[70%]">
                            {
                                description.length > 200 ? description.slice(1, 100) : ""
                            }
                            {
                                description.length > 200 && <span className="text-blue-400 hover:underline cursor-pointer px-2">
                                    read more
                                </span>
                            }
                        </p>
                        <span className="text-gray-400 text-sm">{publishedDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

