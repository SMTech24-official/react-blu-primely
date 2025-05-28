import { Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetTournamentsQuery } from "../../../redux/apis/tournament/TournamentApi.ts";
import TournamentsInfo from "../../allCards/tournmentsInfoCard/TournamentsInfo";
import { DatePickerDemo } from "../../datePicker/Date";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import MetricCards from "../dashboard/MetricCards";
import { toast } from "react-hot-toast";
import { Skeleton } from "../../ui/skeleton";

// Custom Alert component
const Alert = ({
  variant = "default",
  className = "",
  children,
}: {
  variant?: "default" | "destructive";
  className?: string;
  children: React.ReactNode;
}) => {
  const baseStyles = "p-4 rounded-lg border";
  const variantStyles = {
    default: "bg-blue-50 text-blue-900 border-blue-200",
    destructive: "bg-red-50 text-red-900 border-red-200",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

const AlertDescription = ({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`text-sm [&_p]:leading-relaxed ${className}`}>{children}</div>
);

// API Tournament Type
interface ApiTournament {
  id: string;
  userId: string;
  title: string;
  subtitle?: string;
  description: string;
  gameName: string;
  tournamentType: string;
  participationType: "SOLO" | "TEAM";
  startDate: string;
  endDate: string;
  prizePool: number;
  entryFee: number;
  region: string;
  maxTeams: number;
  teamSize: number;
  skillLevel: string;
  gamePlatform: string;
  rules: string;
  image: string;
  enrolled: number;
  createdAt: string;
  updatedAt: string;
  status: string;
}

// Type expected by TournamentsInfo component
interface TournamentsInfoProps {
  id: string;
  title: string;
  prize: number
  status?: string;
  gameName: string;
  entryFee: number;
  date: string;
  maxTeams: number;
  enrolled: number;
  imageSrc?: string;
  teamSize?: string;
  regions?: string;
  skillLevel?: string;
  createdAt: string;
  tournamentType?: string;
  fixture?: boolean;
}

export default function AdminTournamentsTab() {
  const [selectedStatus, setSelectedStatus] = useState<string>("started");
  const [date, setDate] = useState<Date>();
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data, isLoading, isError, error } = useGetTournamentsQuery({
    page,
    limit,
  });


  if (isError) {
    toast.error("Failed to load tournaments");
  }

  // Transform API data to match TournamentsInfo props
  const transformTournament = (
    tournament: ApiTournament
  ): TournamentsInfoProps => ({
    title: tournament.title,
    prize: tournament.prizePool,
    status: tournament.status,
    gameName: tournament.gameName,
    entryFee: tournament.entryFee,
    date: tournament.endDate,
    maxTeams: tournament.maxTeams,
    createdAt: tournament.createdAt,
    tournamentType: tournament.tournamentType,
    teamSize: tournament.teamSize.toString(),
    regions: tournament.region,
    skillLevel: tournament.skillLevel,
    enrolled: tournament.enrolled,
    id: tournament.id,
  });

  // Calculate metrics
  const totalTournaments = data?.meta?.total || 0;
  const totalParticipants =
    data?.data?.reduce((sum, t) => sum + (t.enrolled || 0), 0) || 0;

  return (
    <div className="rounded-lg space-y-11">
      {isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {error?.toString() || "Failed to load tournaments"}
          </AlertDescription>
        </Alert>
      )}

      <div className="">
        <MetricCards
          cardOneText="Total Tournaments"
          cardThreeText="Completed Tournaments"
          cardTwoText="Total Participants"
          subtitle={false}
          icon={false}
          players={totalParticipants}
          revenue={0}
          tournments={totalTournaments}
        />
      </div>

      <div className="bg-fourthColor p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full bg-transparent border-gray-800">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="started">Started</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerDemo date={date} setDate={setDate} />

          <div />

          <Link to="/dashboard/tournaments/addTournaments">
            <Button className="bg-primary_highlighted hover:bg-blue-600 text-white flex items-center gap-2 w-full h-full">
              <Plus className="w-4 h-4" /> Add Tournament
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : data?.data?.length ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {data.data.map((tournament) => (
              <TournamentsInfo
                key={tournament.id}
                {...transformTournament(tournament)}
              />
            ))}
          </div>
        ) : (
          <NoDataAvailable text="No tournaments available right now" />
        )}

        {data?.meta?.totalPage && data.meta.totalPage > 1 && (
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500">
              Page {page} of {data.meta.totalPage}
            </span>
            <Button
              variant="outline"
              disabled={page >= data.meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
