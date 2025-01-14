import feature1 from "@/assets/feature/fi_7401085.png";
import feature2 from "@/assets/feature/fi_956926.jpg";
import feature3 from "@/assets/feature/Group.png";
import feature4 from "@/assets/feature/svgexport-4 1.png";
import feature5 from "@/assets/feature/svgexport-5 1.png";
import feature6 from "@/assets/feature/svgexport-6 1.png";
import feature7 from "@/assets/feature/svgexport-7 1.png";
import SpotLight from "../../ui/demo";
import FeatureAndSates from "../../shared/featureNSates/FeatureAndSates";


type FeaturedProps = {
    id?: number;
    feature: string;
    feature2?: string;
    image: string;
    classProps?: string;
}

const Feature = () => {

    const feature = [
        {
            id: 1,
            feature: "Automated Match Scheduling",
            image: feature1,
        },
        {
            id: 2,
            feature: "Real-Time Leaderboards",
            image: feature2,
        },
        {
            id: 3,
            feature: "Global and Clan Ranking",
            image: feature3,
        },
    ]

    const states = [
        {
            id: 1,
            feature: "Automated Match Scheduling",
            feature2: "Automated Match Scheduling",
            image: feature4,
        },
        {
            id: 2,
            feature: "Real-Time Leaderboards",
            feature2: "Real-Time Leaderboards",
            image: feature5,
        },
        {
            id: 3,
            feature: "Global and Clan Ranking",
            feature2: "Global and Clan Ranking",
            image: feature6,
        },
        {
            id: 4,
            feature: "Global and Clan Ranking",
            feature2: "Global and Clan Ranking",
            image: feature7,
        },
    ]

    return (
        <SpotLight >
            <div className="pt-[4rem]">
                <h1 className='text-4xl md:text-5xl text-center font-bold text-white uppercase'>Feature Overview</h1>
                <div className='flex flex-col flex-wrap md:flex-row items-center justify-center gap-10 py-24 container'>
                    {
                        feature.map((data: FeaturedProps) =>
                            <FeatureAndSates key={data.id} classProps='w-22 h-22' parentClass="px-4 py-2" feature={data.feature} image={data.image} />
                        )
                    }
                </div>
                <div className='bg-[#171717]'>
                    <div className='flex flex-col flex-wrap md:flex-row items-center justify-center gap-10 py-24'>
                        {
                            states.map((data: FeaturedProps) => <FeatureAndSates parentClass='css_bg_states p-5 rounded-md w-full max-w-[288px]' classProps='w-22 h-22' key={data.id} feature={data.feature} image={data.image} feature2={data.feature2 ?? ""} />)
                        }
                    </div>
                </div>
            </div>
        </SpotLight>
    );
};

export default Feature;