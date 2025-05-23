import { useLocation } from "react-router-dom";
import BattleBanner from "../../components/BattleGroundsTournament/BattleBanner/BattleBanner";
import NoDataAvailable from "../../components/shared/noData/NoDataAvailableTwo";
import UpcomingTournamentPage from "../../components/BattleGroundsTournament/UpcomingTournaments/UpcomingTournaments";
import { TournamentProps } from "../../types/types";
import { tournaments } from "../../lib/fakeData/tournments";



const FeaturedTournament = () => {

    const location = useLocation(); // Get the current location
    const path = location.pathname; // Extract the pathname
    // const { width, height } = useWindowSize();
    const slug = path?.split("/")[2]
    const GameData = tournaments.find((data: TournamentProps) => data.game === slug)


    // window.scrollTo({
    //     top: 0,
    //     behavior: "smooth"
    // });

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
