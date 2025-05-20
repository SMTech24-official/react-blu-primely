/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from "lucide-react";
import { useGetClanAchievementsQuery } from "../../../redux/apis/clan/ClanApi";
import Award from "./Award";
import { TableComponents } from "./Table";
import { useParams } from "react-router-dom";
import { TAward } from "../../../redux/types";


export type TMatch = {
    id: string;
    createdAt: string; // ISO timestamp
    updatedAt: string;
    startTime: string;
    status:string
    round: string; // e.g., "Final", "Semifinal"
    position: string; // e.g., "1st", "2nd"

    team1Id: string;
    team2Id: string;
    winnerId: string;
    tournamentId: string;

    opponent: {
        id: string;
        name: string;
        logo: string | null;
    };

    tournament: {
        gameName: string;
        title: string;
    };
}



const AchievementsTab = () => {
    const { id } = useParams<{ id: string }>();
    console.log(useParams());

    const { data, isLoading, error } = useGetClanAchievementsQuery(id)
    if (isLoading) return <div className="flex justify-center p-8"><Loader className="animate-spin" /></div>;
    if (error) return <div className="p-4 text-red-500">Error loading clan data</div>;


    const matches: TMatch[] =data?.data?.matches
    const specialAwards: TAward[] = data?.data?.specialAwards
    
    const awardNames: any = specialAwards.map(a => a.name.toLowerCase());
    
    return (
        <div className="space-y-6 md:space-y-8 lg:space-y-14">
            <div className="space-y-2 md:space-y-4 lg:space-y-8">
                <p className="text-lg lg:text-2xl font-bold"> Tournaments Won</p>
                <TableComponents matches={matches} />
            </div>
            <div className="space-y-2 md:space-y-4 lg:space-y-8">
                <p className="text-lg lg:text-2xl font-bold">Special Awards</p>
                <Award awards={awardNames} />
            </div>
        </div>
    );
};

export default AchievementsTab;