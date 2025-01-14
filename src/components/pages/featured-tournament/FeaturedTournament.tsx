import { useLocation } from "react-router-dom";
import { tournaments } from "../../../lib/fakeData/tournments";
import { TournamentProps } from "../../../types/types";
import BattleBanner from "../../BattleGroundsTournament/BattleBanner/BattleBanner";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";
import UpcomingTournamentPage from "../../BattleGroundsTournament/UpcomingTournaments/UpcomingTournaments";


const FeaturedTournament = () => {

    const location = useLocation(); // Get the current location
    const path = location.pathname; // Extract the pathname
    // const { width, height } = useWindowSize();
    const slug = path?.split("/")[2]
    const GameData = tournaments.find((data: TournamentProps) => data.game === slug)
    console.log(GameData);


    return (
        <div className="">
            {
                GameData ? <BattleBanner tournaments={GameData} /> : <div>
                    <NoDataAvailable text="No Tournaments Available To Featured" />

                </div>
            }

            <UpcomingTournamentPage />
        </div>
    );
};

export default FeaturedTournament;
