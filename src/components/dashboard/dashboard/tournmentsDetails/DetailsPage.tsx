/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGenerateMatchesMutation } from "../../../../redux/apis/match/matchApi";
import {
  useDeleteTournamentMutation,
  useGetTournamentByIdQuery,
} from "../../../../redux/apis/tournament/TournamentApi";
import Loading from "../../../others/Loading";
import { ParticipantsTable } from "./participant";
import TournamentDetails from "./TournamentsDetailsCom";

export default function DetailsPage() {
  const location = useLocation();
  const path = location.pathname;
  const slug = path?.split("/")[3];

  const router = useNavigate();

  const { data, error, isLoading } = useGetTournamentByIdQuery(slug!, {
    skip: !slug,
  });

  const [generateMatches] = useGenerateMatchesMutation();
  const [deleteMatch] = useDeleteTournamentMutation();

  // Later in your code
  const handleGenerateMatches = async (tournamentId: string) => {
    try {
      const result = await generateMatches({ tournamentId });
      // Handle success
      // console.log(result);
      if (result.data?.success) {
        toast.success("Match Generated Successfully");
      }
    } catch (error: any) {
      toast.error("error", error.message || "");
      // console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteMatch(id);
      // Handle success
      // console.log(result);
      if (result.data?.success) {
        toast.success("Tournaments Deleted Successfully");
        router("/dashboard/tournaments");
      }
    } catch (error: any) {
      toast.error("error", error.message || "");
    }
  };

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
        handleGenerateMatches={handleGenerateMatches}
        handleDelete={handleDelete}
      />
      <ParticipantsTable participants={tournament.participants || []} />
    </div>
  );
}
