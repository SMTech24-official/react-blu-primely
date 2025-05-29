import { participants } from "../../../../redux/apis/tournament/TournamentApi";
import ClanComponents from '../../../shared/ClanCard/ClanComponents';



const Clan = ({ participants }: { participants: participants[] }) => {

  return (
    <div>
      <ClanComponents isRosterHidden={false} teams={participants} />
    </div>
  );
};

export default Clan;