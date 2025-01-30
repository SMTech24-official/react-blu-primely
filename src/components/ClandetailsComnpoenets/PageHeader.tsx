interface PageHeaderProps {
    title: string;
    subTitle: string;
    backgroundImage?: string;
    className?: string;
}

export function PageHeader({
    title,
    subTitle,
    backgroundImage,
}: PageHeaderProps) {
    return (
        <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden lg:h-[400px]">
            {/* Background Image */}
            <img
                src={backgroundImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2c2a50] to-[#0c2c2aaa]" />

            {/* Content */}
            <div className="absolute inset-0  px-4 text-center w-full ">
                <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto">
                    <h1 className="text-xl font-medium text-white md:text-2xl lg:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-2 lg:mt-4  text-white md:text-lg">{subTitle}</p>
                </div>
            </div>
        </div>
    );
}
