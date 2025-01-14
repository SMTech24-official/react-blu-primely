import { Members } from "../../../lib/fakeData/leaderboardData";
import { LeaderboardTable } from "../leaderboardTable/LeaderboardTable";

const Clan = () => {
  // Filter members by type 'clan'
  const clanMembers = Members.filter((member) => member.type === "clan");

  return (
    <div>
      <LeaderboardTable members={clanMembers} />
    </div>
  );
};

export default Clan;
