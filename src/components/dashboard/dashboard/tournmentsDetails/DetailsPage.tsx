import { useLocation } from "react-router-dom";
import TournamentDetails from "./TournamentsDetailsCom";
import { useGetTournamentByIdQuery } from "../../../../redux/apis/tournament/TournamentApi";
import Loading from "../../../others/Loading";
import { ParticipantsTable } from "./participant";

export default function DetailsPage() {
  const location = useLocation();
  const path = location.pathname;
  const slug = path?.split("/")[3];

  const { data, error, isLoading } = useGetTournamentByIdQuery(slug!, {
    skip: !slug,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error loading tournament details</div>;
  }

  if (!data?.data) {
    return <div>Tournament not found</div>;
  }

  const tournament = data.data;

  return (
    <div>
      <TournamentDetails
        id={tournament.id}
        date={tournament.startDate}
        // enrollmentStatus={tournament.enrolled < tournament.maxTeams}
        entryFee={tournament.entryFee}
        imageSrc={tournament.image}
        prize={tournament.prizePool}
        regions={tournament.region}
        // registrationStatus={tournament.status === "ACTIVE"}
        skillLevel={tournament.skillLevel}
        teamSize={tournament.teamSize}
        title={tournament.title}
        enrolledTeams={tournament.enrolled}
        game={tournament.gameName}
        maxTeams={tournament.maxTeams}
        platform={tournament.gamePlatform}
        status={tournament.status}
        subtitle={tournament.subtitle}
        tournamentType={tournament.tournamentType}
        description={tournament.description} // Added description if your component supports it
        rules={tournament.rules}
      />
      <ParticipantsTable participants={tournament.participants || []} />
    </div>
  );
}
