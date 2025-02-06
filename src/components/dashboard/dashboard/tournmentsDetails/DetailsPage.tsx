import { useLocation } from "react-router-dom";
import TournamentDetails from "./TournamentsDetailsCom";
import { TournamentProps } from "../../../../types/types";
import { tournaments } from "../../../../lib/fakeData/tournments";

export default function DetailsPage() {
    const location = useLocation();
    const path = location.pathname;
    const slug = path?.split("/")[3];

    const GameData = tournaments.find((data: TournamentProps) => data.game === slug);

    return (
        <TournamentDetails
            date={GameData?.date || "N/A"}
            enrollmentStatus={GameData?.enrollmentStatus as boolean}
            entryFee={GameData?.entryFee as number}
            imageSrc={GameData?.imageSrc || ""}
            prize={GameData?.prize as {
                totalPrize: number;
                firstPrize: number;
                secondPrize: number;
                thirdPrize: number;
            }}
            regions={GameData?.regions || "Global"}
            registrationStatus={GameData?.registrationStatus as boolean}
            skillLevel={GameData?.skillLevel || "All Levels"}
            teamSize={GameData?.teamSize || "1"}
            title={GameData?.title || "Tournament"}
            enrolledTeams={GameData?.enrolledTeams || 0}
            game={GameData?.game}
            maxTeams={GameData?.maxTeams}
            platform={GameData?.platform || "PC"}
            status={GameData?.status}
            subtitle={GameData?.subtitle || "No details available"}
            tournamentType={GameData?.tournamentType || "Single Elimination"}
        />
    );
}
