import { players } from "../../../../lib/fakeData/recent";
import { useGetTournamentsQuery } from "../../../../redux/apis/tournament/TournamentApi";
import PlayerCard from "../../../allCards/playerCard/PlayerCard";
import TournamentsInfo from "../../../allCards/tournmentsInfoCard/TournamentsInfo";
import NoDataAvailable from "../../../shared/noData/NoDataAvailableTwo";
import { Skeleton } from "../../../ui/skeleton";



interface ApiTournament {
  id: string;
  userId: string;
  title: string;
  subtitle?: string;
  description: string;
  gameName: string;
  tournamentType: string;
  participationType: "SOLO" | "TEAM";
  startDate: string;
  endDate: string;
  prizePool: number;
  entryFee: number;
  region: string;
  maxTeams: number;
  teamSize: number;
  skillLevel: string;
  gamePlatform: string;
  rules: string;
  image: string;
  enrolled: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

// Type expected by TournamentsInfo component
interface TournamentsInfoProps {
  id: string;
  title: string;
  prize: number;
  status?: string;
  gameName: string;
  entryFee: number;
  date: string;
  maxTeams: number;
  enrolled: number;
  imageSrc?: string;
  teamSize?: string;
  regions?: string;
  skillLevel?: string;
  createdAt: string;
  tournamentType?: string;
  fixture?: boolean;
}



const RecentAll = () => {

  const { data, isLoading } = useGetTournamentsQuery({
    limit: 10,
  });



  const transformTournament = (
    tournament: ApiTournament
  ): TournamentsInfoProps => ({
    title: tournament.title,
    prize: tournament.prizePool,
    status: tournament.status,
    gameName: tournament.gameName,
    entryFee: tournament.entryFee,
    date: tournament.endDate,
    maxTeams: tournament.maxTeams,
    createdAt: tournament.createdAt,
    tournamentType: tournament.tournamentType,
    teamSize: tournament.teamSize.toString(),
    regions: tournament.region,
    skillLevel: tournament.skillLevel,
    enrolled: tournament.enrolled,
    id: tournament.id,
  });

  return (
    <div className="grid xl:grid-cols-3 2xl:grid-cols-2 gap-10">
      <div className="xl:col-span-2 2xl:col-span-1">
        <h1 className="text-lg font-semibold text-primary_highlighted my-3">
          🏆 New Tournament Created
        </h1>
        <div className="flex flex-col gap-3">


          {isLoading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-48 w-full rounded-lg" />
              ))}
            </div>
          ) : data?.data?.length ? (
            <div className="grid grid-cols-1 gap-6">
              {data.data.map((tournament) => (
                <TournamentsInfo
                  key={tournament.id}
                  {...transformTournament(tournament)}
                />
              ))}
            </div>
          ) : (
            <NoDataAvailable text="No tournaments available right now" />
          )}
        </div>
      </div>

      <div className="">
        <h1 className="text-lg font-semibold text-primary_highlighted my-3">
          👤 Player Registered
        </h1>
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
