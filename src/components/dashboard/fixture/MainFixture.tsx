import { useGetTournamentsQuery } from "../../../redux/apis/tournament/TournamentApi";
import TournamentsInfo from "../../allCards/tournmentsInfoCard/TournamentsInfo";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";
import { Skeleton } from "../../ui/skeleton";



export default function MainFixture() {

  const { data, isLoading } = useGetTournamentsQuery({
    status: "ACTIVE",
  });


  return (
    <div className=" rounded-lg space-y-11">
      <div className="bg-fourthColor p-4">
        <p className="font-semibold text-2xl uppercase mb-4">Match Fixture</p>
        {isLoading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : data?.data?.length ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {data.data.map((tournament, idx) => (
              <TournamentsInfo
                tournamentType={tournament.tournamentType as string}
                createdAt=""
                maxTeams={tournament.maxTeams as number}
                gameName={tournament.gameName as string}
                key={idx}
                prize={tournament.prizePool ?? 0}
                title={tournament.title}
                date={tournament.startDate}
                entryFee={tournament.entryFee}
                status={tournament?.status}
                fixture
                id={tournament.id}
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
