import { players, tournaments } from "../../../../lib/fakeData/recent";
import PlayerCard from "../../../allCards/playerCard/PlayerCard";
import TournamentsInfo from "../../../allCards/tournmentsInfoCard/TournamentsInfo";





const RecentAll = () => {
    return (
        <div className="grid xl:grid-cols-3 2xl:grid-cols-2 gap-10">
            <div className="xl:col-span-2 2xl:col-span-1">
                <h1 className="text-lg font-semibold text-primary_highlighted my-3">🏆 New Tournament Created</h1>
                <div className="flex flex-col gap-3">
                    {tournaments.map((data, idx) => (
                        <TournamentsInfo
                            key={idx}
                            title={data.title}
                            prize={data.prize}
                            date={data.date}
                            entryFee={data.entryFee}
                            gameName={data.gameName}
                            maxTeams={data.maxTeams}
                        />
                    ))}
                </div>
            </div>

            <div className="">
                <h1 className="text-lg font-semibold text-primary_highlighted my-3">👤 Player Registered</h1>
                <div className="grid 2xl:grid-cols-2 gap-3">
                    {players.map((data, idx) => (
                        <PlayerCard
                            key={idx}
                            feePaid={data.feePaid}
                            name={data.name}
                            tournaments={data.tournaments}
                            type={data.type}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentAll;
