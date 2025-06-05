/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { useGetTournamentsFixtureQuery } from "../../redux/apis/tournament/TournamentApi";
import TournamentBracket from "./components/TournamentBracket";
import Loading from "../others/Loading";

const NewBracket = ({ newId }: { newId?: string }) => {
  const location = useLocation(); // Get the current location
  const path = location.pathname; // Extract the pathname
  // const { width, height } = useWindowSize();
  const id = path?.split("/")[3];
  const { data, isLoading } = useGetTournamentsFixtureQuery({
    id: newId || id,
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <TournamentBracket data={(data?.data as any) || []} />
    </div>
  );
};

export default NewBracket;
