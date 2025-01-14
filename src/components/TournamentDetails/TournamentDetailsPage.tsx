import { useState } from "react";
import Confetti from 'react-confetti';
import NoDataAvailable from "../shared/noData/NoDataAvailableTwo";
import TournamentBanner from "./TournamentBanner/TournamentBanner";
import TournamentDetailsTab from "./TournamentDetailsTab/TournamentDetailsTab";
import { useLocation } from "react-router-dom";
import { tournaments } from "../../lib/fakeData/tournments";
import { TournamentProps } from "../../types/types";
// import { useWindowSize } from 'react-use'

const TournamentDetailsPage = () => {

  const location = useLocation()
  const path = location.pathname
  const [showConfetti, setShowConfetti] = useState(false);
  // const { width, height } = useWindowSize();
  const slug = path?.split("/")[2]
  const GameData = tournaments.find((data: TournamentProps) => data.game === slug)
  console.log(GameData);
  return (


    <div className="overflow-hidden relative">
      {
        GameData ? <div>
          <TournamentBanner
            bannerImage={GameData?.imageSrc as string}
            title={GameData?.title ?? " Game Title"}
            subtitle={GameData?.subtitle ?? "Game subtitle"}
            gameName={GameData?.game ?? "Game Name"}
            tournamentType="COMMUNITY TOURNAMENT"
            platform={GameData?.platform ?? "GAme Platform"}
            startDate={GameData?.date ? new Date(GameData?.date).toDateString() : "Unknown Date"}
            registrationStatus={GameData?.registrationStatus ?? true}
            enrollmentStatus={GameData?.enrollmentStatus ?? true}
            entryFee={GameData?.entryFee ?? 0}
            teamSize={GameData?.teamSize ?? "Team Size"}
            maxTeams={GameData?.maxTeams ?? 0}
            enrolledTeams={GameData?.enrolledTeams ?? 0}
            skillLevel={GameData?.skillLevel ?? "Skill Level"}
            setShowConfetti={setShowConfetti}
          />

          <TournamentDetailsTab />
        </div> : <div className="w-full h-[50vh]">
          <NoDataAvailable text="Currently No Game Available" />
        </div>
      }
      {showConfetti && <Confetti recycle={false} width={window.innerWidth} height={window.innerHeight} />}
    </div>
  );
};

export default TournamentDetailsPage;
