import { MatchData, RecentMatch } from "../../../lib/fakeData/achievements";
import MatchCard from "../../allCards/matchCard/MatchCard";
import { DatePickerDemo } from "../../datePicker/Date";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { MatchTable } from "./MatchTable";
import { useState } from "react";

const MatchesTab = () => {

    const [selectedGame, setSelectedGame] = useState<string>("all");
    const [date, setDate] = useState<Date>()


    return (
        <div className="space-y-6 md:space-y-8 lg:space-y-14">
            <div className="space-y-2 md:space-y-4 lg:space-y-8">
                <p className="text-lg lg:text-2xl font-bold"> Matches & Tournaments</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
                    <Select value={selectedGame} onValueChange={setSelectedGame}>
                        <SelectTrigger className="w-full bg-transparent border-gray-800">
                            <SelectValue placeholder="Games" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Matches</SelectItem>
                            <SelectItem value="Tournaments">Tournaments</SelectItem>
                            <SelectItem value="Championship">Championship</SelectItem>
                        </SelectContent>
                    </Select>

                    <DatePickerDemo date={date} setDate={setDate} />
                </div>
                <MatchTable members={MatchData} />
            </div>
            <div className="space-y-2 md:space-y-4 lg:space-y-8">
                <p className="text-lg lg:text-2xl font-bold">Recent Matches</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-3 md:gap-5 lg:gap-6">
                    {
                        RecentMatch?.map((match, index) => (
                            <MatchCard
                                image={match.image}
                                key={index}
                                date={match.date}
                                opponent={match.opponent}
                                result={match.result}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default MatchesTab;
