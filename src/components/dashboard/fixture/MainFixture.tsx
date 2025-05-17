/* eslint-disable @typescript-eslint/no-explicit-any */
import { tournaments } from "../../../lib/fakeData/tournments";
import TournamentsInfo from "../../allCards/tournmentsInfoCard/TournamentsInfo";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";

export default function MainFixture() {
  const activeTournments = tournaments.filter(
    (data) => data.status === "ACTIVE"
  );
  return (
    <div className=" rounded-lg space-y-11">
      <div className="bg-fourthColor p-4">
        <p className="font-semibold text-2xl uppercase mb-4">Match Fixture</p>
        {activeTournments.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {activeTournments.map((tournament: any, idx: number) => (
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
                id={""}
                enrolled={0}
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
