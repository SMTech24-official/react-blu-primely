import { useGetRecentMatchQuery } from "../../redux/apis/match/matchApi";
import RecentMatch from "../allCards/recentMatch/RecentMatch";
import Loading from "../others/Loading";

const RecentlyPlayed = () => {
  const { data, isLoading } = useGetRecentMatchQuery({ matchType: "recent" });

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (!data?.data || data.data.length === 0) {
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
        {data?.data.map((match, index) => (
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
