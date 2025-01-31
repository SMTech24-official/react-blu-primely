import { MatchCardProps } from "../../../types/types";


export default function MatchCard({ opponent, date, result, image }: MatchCardProps) {
    return (
        <div className="w-full  bg-[#1a1a1a] overflow-hidden rounded-lg group hover:cursor-pointer">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt="Apex Legends Banner"
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
            </div>

            <div className="p-4 space-y-2">
                <h2 className="text-white text-xl font-bold">APEX LEGENDS WINTER SHOWDOWN</h2>

                <div className="space-y-1">
                    <p className="text-gray-300">Opponent : {opponent}</p>
                    <p className="text-gray-300">Date : {new Date(date).toLocaleString()}</p>
                    <p className="text-gray-300">Result : {result} {result.toLocaleLowerCase() === "win" && `🎯`} </p>
                </div>
            </div>
        </div>
    )
}

