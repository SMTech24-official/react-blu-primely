/* eslint-disable @typescript-eslint/no-explicit-any */
import TournamentBracket from "./components/TournamentBracket";
import { tournamentData } from "./data/tournamentData";

const NewBracket = () => {
  return (
    <div>
      <TournamentBracket data={tournamentData as any} />
    </div>
  );
};

export default NewBracket;
