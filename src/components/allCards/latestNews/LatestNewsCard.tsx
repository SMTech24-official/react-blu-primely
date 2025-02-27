
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
                    alt="News Thumbnail"
                    className={`object-cover border sm:aspect-[16/9] w-full rounded-md border-blue-500 transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-md" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-4 sm:p-6 w-full">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                        {title}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <p className="text-gray-200 text-xs sm:text-sm md:text-base max-w-full sm:max-w-[70%]">
                            {description.length > 100 ? description.slice(0, 100) + '...' : description}
                            {description.length > 100 && <span className="text-blue-400 hover:underline cursor-pointer px-2">read more</span>}
                        </p>
                        <span className="text-gray-400 text-xs sm:text-sm md:text-base mt-2 sm:mt-0">{publishedDate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

