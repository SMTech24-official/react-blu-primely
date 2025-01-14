import { Members } from "../../../lib/fakeData/leaderboardData";
import { LeaderboardTable } from "../leaderboardTable/LeaderboardTable";

const Solo = () => {
  // Filter members by type 'solo'
  const soloMembers = Members.filter((member) => member.type === "solo");

  return (
    <div>
      <LeaderboardTable members={soloMembers} />
    </div>
  );
};

export default Solo;
