import elite from "@/assets/rankAndTrophies/elite.png";
import gold from "@/assets/rankAndTrophies/gold.png";
import silver from "@/assets/rankAndTrophies/sliver.png";
import bronze from "@/assets/rankAndTrophies/bronze.png";
import titan from "@/assets/rankAndTrophies/titan.png";
import spartan from "@/assets/rankAndTrophies/spartan.png";
import heroic from "@/assets/rankAndTrophies/heroic.png";
import metis from "@/assets/rankAndTrophies/metis.png";


const trophyData = [
    {
        type: "ELITE TROPHIES",
        count: "1",
        color: "text-[#5BB5F0]",
        icon: elite,
    },
    {
        type: "GOLD TROPHIES",
        count: "117",
        color: "text-[#FFB636]",
        icon: gold,
    },
    {
        type: "SILVER TROPHIES",
        count: "90",
        color: "text-[#C0C0C0]",
        icon: silver,
    },
    {
        type: "BRONZE TROPHIES",
        count: "61",
        color: "text-[#CD7F32]",
        icon: bronze,
    },
]

const rankData = [
    {
        title: "TITAN",
        subtitle: "Mastery of Primordial Power",
        icon: titan,
    },
    {
        title: "SPARTAN",
        subtitle: "Discipline and Power Unleashed",
        icon: spartan,
    },
    {
        title: "HEROIC",
        subtitle: "The Rise of Strength and Change",
        icon: heroic,
    },
    {
        title: "METIS",
        subtitle: "The Beginning of Wisdom",
        icon: metis,
    },
]

export default function Achievements() {
    return (
        <div className="container space-y-4 md:mt-40 lg:mt-20">
            {/* Trophies Section */}
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {trophyData.map((trophy, index) => (
                    <div key={index} className="bg-[#1A1A1A] border-0 p-4">
                        <div className="flex items-center gap-3">
                            <div className="min-w-[100px] max-w-[100px] max-h-[100px] min-h-[100px] relative">
                                <img src={trophy.icon || "/placeholder.svg"} alt={trophy.type} className="object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className={`2xl:text-lg uppercase ${trophy.color}`}>{trophy.type}</span>
                                <span className={`text-2xl font-bold ${trophy.color}`}>{trophy.count}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ranks Section */}
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {rankData.map((rank, index) => (
                    <div key={index} className="bg-[#1A1A1A] border-0 p-4">
                        <div className="flex items-center gap-4">
                            <div className="min-w-[100px] max-w-[100px] max-h-[100px] min-h-[100px] relative">
                                <img src={rank.icon || "/placeholder.svg"} alt={rank.title} className="object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-bold">{rank.title}</span>
                                <span className="text-gray-400 text-xs leading-tight">{rank.subtitle}</span>
                                <div className="h-2 w-[100%] bg-card_bg rounded-full mt-3">
                                    <div className="css_bg w-[10%] h-full rounded-full">

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

