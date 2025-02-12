import { tournaments } from "../../../lib/fakeData/tournments";
import { TournamentProps } from "../../../types/types";
import TournamentsInfo from "../../allCards/tournmentsInfoCard/TournamentsInfo";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";





export default function MainFixture() {

    const activeTournments = tournaments.filter((data) => data.status === "active")
    return (
        <div className=" rounded-lg space-y-11">
            <div className="bg-fourthColor p-4">
                {activeTournments.length > 0 ? (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {activeTournments
                            .map((tournament: TournamentProps, idx: number) => (
                                <TournamentsInfo
                                    tournamentType={tournament.tournamentType as string}
                                    createdAt=""
                                    maxTeams={tournament.maxTeams as number}
                                    gameName={tournament.game as string}
                                    key={idx}
                                    prize={tournament.prize ?? 0}
                                    title={tournament.title}
                                    date={tournament.date}
                                    entryFee={tournament.entryFee}
                                    status={tournament?.status}
                                    fixture
                                />
                            ))}
                    </div>
                ) : (
                    <NoDataAvailable text="No tournaments available right now" />
                )}
            </div>
        </div>
    );
}

