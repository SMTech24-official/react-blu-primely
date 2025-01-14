
const FeatureAndSates = ({
    feature,
    feature2,
    image,
    classProps,
    parentClass
}: {
    id?: number;
    feature: string;
    feature2?: string;
    image: string;
    classProps?: string;
    parentClass?: string;
}) => {
    return (
        // <SpotLight>
        <div className={`flex flex-col items-center justify-center ${parentClass} cursor-pointer opacity-[85%] hover:opacity-[100%] transition-all duration-300`}>
            <img
                height={100}
                width={100}
                src={image}
                alt={feature}
                className={classProps}
            />
            <p className='text-lg font-semibold mt-10'>{feature}</p>
            <p className='text-sm mt-2'>{feature2}</p>
        </div>
        // </SpotLight >

    );
};

export default FeatureAndSates;