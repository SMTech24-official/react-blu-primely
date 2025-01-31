import { MatchData, RecentMatch } from "../../../lib/fakeData/achievements";
import MatchCard from "../../allCards/matchCard/MatchCard";
import { MatchTable } from "./MatchTable";

const MatchesTab = () => {
    return (
        <div className="space-y-6 md:space-y-8 lg:space-y-14">
            <div className="space-y-2 md:space-y-4 lg:space-y-8">
                <p className="text-lg lg:text-2xl font-bold"> Matches & Tournaments</p>
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
