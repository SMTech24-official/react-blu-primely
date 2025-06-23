import { useGetRecentMatchQuery } from "../../redux/apis/match/matchApi";
import RecentMatch from "../allCards/recentMatch/RecentMatch";
import Loading from "../others/Loading";

interface Tournament {
  title: string;
  gameName: string;
  tournamentType: string;
  participationType: "SOLO" | "TEAM";
  gamePlatform: string;
  startDate: string;
  prizePool: number;
  entryFee: number;
  teamSize: number;
  region: string;
  skillLevel: string;
  image: string;
}

interface Opponent {
  id: string;
  fullName: string | null;
  profilePicture: string | null;
}

interface Match {
  id: string;
  tournamentId: string;
  team1Id: string;
  team2Id: string | null;
  winnerId: string | null;
  startTime: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED" | "scheduled";
  round: string;
  createdAt: string;
  updatedAt: string;
  tournament: Tournament;
  opponent: Opponent;
}



const RecentlyPlayed = () => {
  const { data, isLoading } = useGetRecentMatchQuery({ matchType: "recent" });



  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data) {
    return (
      <div className="space-y-4">
        <p className="text-xl font-medium uppercase">Recently Played Match</p>
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">No recent matches played</p>
        </div>
      </div>
    );
  }

  let matches: Match[] = [];
  if (Array.isArray(data.data)) {
    // Handle MatchArrayResponse case
    matches = data.data;
  } else {
    // Handle MatchGroupedResponse case
    matches = data.data.recent || [];
  }

  if (matches.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-xl font-medium uppercase">Recently Played Match</p>
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">No recent matches played</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xl font-medium uppercase">Recently Played Match</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {matches.map((match, index) => (
          <RecentMatch
            key={index}
            title={match.tournament.title}
            prize={match.tournament.prizePool.toLocaleString()}
            date={match.startTime}
            entryFee={match.tournament.entryFee}
            teamSize={match.tournament.teamSize}
            regions={match.tournament.region}
            skillLevel={match.tournament.skillLevel}
            registrationStatus={match.status}
            game={match.tournament.gameName}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
