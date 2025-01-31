import React from 'react';
import mvp from "@/assets/award/mvp.png";
import strategy from "@/assets/award/strategy.png";
import comeback from "@/assets/award/comeback.png";
import teamwork from "@/assets/award/teamwork.png";
import { AwardData, AwardType } from '../../../types/types';

// Define the structure for award data


// Define the structure for the props
interface AwardProps {
    awards: AwardType[];
}

const awardsData: Record<AwardType, AwardData> = {
    mvp: {
        image: mvp,
        title: "MVP",
        description: "Awarded to the player whose performance was most valuable throughout the tournament.",
    },
    strategy: {
        image: strategy,
        title: "Best Strategy",
        description: "Awarded to the player who demonstrated exceptional strategic thinking and decision-making.",
    },
    comeback: {
        image: comeback,
        title: "Best Teamwork",
        description: "Awarded to the player who exhibited outstanding teamwork and collaboration with teammates.",
    },
    teamwork: {
        image: teamwork,
        title: "Best Comeback",
        description: "Awarded to the team that made the most impressive comeback during the tournament.",
    },
};

const Award: React.FC<AwardProps> = ({ awards }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-4">
            {awards.map((award) => {
                const awardData = awardsData[award];
                return (
                    <div key={award} className="css_bg p-[1px] rounded-lg">
                        <div className="bg-black text-white rounded-lg p-5 text-center shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl w-full h-full">
                            <div className="flex items-center justify-center mb-4 relative">
                                <img
                                    src={awardData?.image}
                                    alt={`${awardData?.title} award icon`}
                                    className="w-fit h-20 object-contain absolute right-0 -top-12 bg-black shadow-sm shadow-gray-800"
                                />
                                <h3 className="text-xl font-semibold">{awardData?.title}</h3>
                            </div>
                            <p className="text-sm">{awardData?.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Award;
