import { useLocation } from "react-router-dom";
import BattleBanner from "../../components/BattleGroundsTournament/BattleBanner/BattleBanner";
import UpcomingTournamentPage from "../../components/BattleGroundsTournament/UpcomingTournaments/UpcomingTournaments";
import NoDataAvailable from "../../components/shared/noData/NoDataAvailableTwo";
import { useGetTournamentsQuery } from "../../redux/apis/tournament/TournamentApi";
import Loading from "../../components/others/Loading";



const FeaturedTournament = () => {

    const location = useLocation(); // Get the current location
    const path = location.pathname; // Extract the pathname
    // const { width, height } = useWindowSize();
    const slug = path?.split("/")[2]
    const { data: GameData, isLoading } = useGetTournamentsQuery({ gameName: slug })

    if (isLoading) {
        return <Loading />
    }
    return (
        <div className="">
            {
                GameData ? <BattleBanner tournaments={GameData?.data[0]} /> : <div>
                    <NoDataAvailable text="No Tournaments Available To Featured" />
                </div>
            }
            {
                GameData && <UpcomingTournamentPage tournaments={GameData.data} />
            }

        </div>
    );
};

export default FeaturedTournament;
