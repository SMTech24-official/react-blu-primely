import { useState } from "react";
import Confetti from 'react-confetti';
import { useLocation } from "react-router-dom";
import { useGetTournamentByIdQuery } from "../../redux/apis/tournament/TournamentApi";
import NoDataAvailable from "../shared/noData/NoDataAvailableTwo";
import TournamentBanner from "./TournamentBanner/TournamentBanner";
import TournamentDetailsTab from "./TournamentDetailsTab/TournamentDetailsTab";
import Loading from "../others/Loading";
// import { useWindowSize } from 'react-use'

const TournamentDetailsPage = () => {

  const location = useLocation()
  const path = location.pathname
  const [showConfetti, setShowConfetti] = useState(false);
  // const { width, height } = useWindowSize();
  const slug = path?.split("/")[2]
  const { data: GameData, isLoading } = useGetTournamentByIdQuery(slug)



  if (isLoading) {
    return <Loading />
  }
  const currentDate = new Date();
  const startDate = GameData?.data?.startDate ? new Date(GameData.data.startDate) : null;

  // Determine registration status: true if startDate is in the future, false otherwise
  const registrationStatus = startDate ? startDate > currentDate : false;
  return (


    <div className="overflow-hidden relative">
      {
        GameData ? <div>
          <TournamentBanner
            bannerImage={GameData?.data?.image as string}
            title={GameData?.data?.title ?? " Game Title"}
            subtitle={GameData?.data?.subtitle ?? "Game subtitle"}
            gameName={GameData?.data?.gameName ?? "Game Name"}
            tournamentType="COMMUNITY TOURNAMENT"
            platform={GameData?.data?.gamePlatform ?? "GAme Platform"}
            startDate={GameData?.data?.startDate ? new Date(GameData?.data?.startDate).toDateString() : "Unknown Date"}
            registrationStatus={registrationStatus}
            enrollmentStatus={GameData?.data?.maxTeams === GameData?.data?.participants.length}
            entryFee={GameData?.data?.entryFee ?? 0}
            teamSize={GameData?.data?.teamSize ?? "Team Size"}
            maxTeams={GameData?.data?.maxTeams ?? 0}
            enrolledTeams={GameData?.data?.participants.length ?? 0}
            skillLevel={GameData?.data?.skillLevel ?? "Skill Level"}
            setShowConfetti={setShowConfetti}
          />

          <TournamentDetailsTab rules={GameData?.data?.rules} participants={GameData?.data?.participants} />
        </div> : <div className="w-full h-[50vh]">
          <NoDataAvailable text="Currently No Game Available" />
        </div>
      }
      {showConfetti && <Confetti recycle={false} width={window.innerWidth} height={1000} />}
    </div>
  );
};

export default TournamentDetailsPage;
