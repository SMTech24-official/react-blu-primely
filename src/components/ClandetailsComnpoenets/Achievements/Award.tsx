import comeback from "@/assets/award/comeback.png";
import mvp from "@/assets/award/mvp.png";
import strategy from "@/assets/award/strategy.png";
import teamwork from "@/assets/award/teamwork.png";
import React from 'react';
import { AwardData, AwardType } from '../../../types/types';
import NoDataAvailable from '../../shared/noData/NoDataAvailableTwo';

// Define the structure for award data


// Define the structure for the props
interface AwardProps {
    awards: AwardType[];
    showText?: boolean
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


const Award: React.FC<AwardProps> = ({ awards, showText = true }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-4">
            {
                awards.length > 0 ?
                    awards.map((award) => {
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
                                    {
                                        showText && <p className="text-sm">{awardData?.description}</p>
                                    }

                                </div>
                            </div>
                        );
                    }) : <NoDataAvailable text='No Award Given' />
            }

        </div>
    );
};

export default Award;





// Define the structure for award data


// Define the structure for the props
// interface AwardProps {
//     specialAwards: TAward[];
//     showText?: boolean
// }

// const awardsData: Record<AwardType, AwardData> = {

//     mvp: {
//         image: mvp,
//         title: "MVP",
//         description: "Awarded to the player whose overall performance was the most outstanding and impactful throughout the tournament.",
//     },
//     strategy: {
//         image: strategy,
//         title: "Best Strategy",
//         description: "Awarded to the player or team that demonstrated exceptional tactical planning and strategic execution.",
//     },
//     comeback: {
//         image: comeback,
//         title: "Best Comeback",
//         description: "Awarded to the team that overcame significant disadvantages to make a remarkable recovery and turn the game in their favor.",
//     },
//     teamwork: {
//         image: teamwork,
//         title: "Best Teamwork",
//         description: "Awarded to the team that showed the highest level of coordination, support, and synergy among members"
//     }
// };


// const Award: React.FC<AwardProps> = ({ specialAwards, showText = true }) => {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-4">
//             {specialAwards.map((award: TAward) => {
//                 const awardData = awardsData[award.name];
//                 return (
//                     <div key={award.id} className="css_bg p-[1px] rounded-lg">
//                         <div className="bg-black text-white rounded-lg p-5 text-center shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl w-full h-full">
//                             <div className="flex items-center justify-center mb-4 relative">
//                                 <img
//                                     src={awardData?.image}
//                                     alt={`${awardData?.title} award icon`}
//                                     className="w-fit h-20 object-contain absolute right-0 -top-12 bg-black shadow-sm shadow-gray-800"
//                                 />
//                                 <h3 className="text-xl font-semibold">{awardData?.title}</h3>
//                             </div>
//                             {
//                                 showText && <p className="text-sm">{awardData?.description}</p>
//                             }

//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// };

// export default Award;
