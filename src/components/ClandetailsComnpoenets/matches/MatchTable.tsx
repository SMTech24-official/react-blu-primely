import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";

interface Tournament {
  title: string;
  gameName: string;
  tournamentType: string;
  participationType: "SOLO" | "TEAM";
  gamePlatform: string;
  startDate: string;
  prizePool: number;
  entryFee: number;
  teamSize: number;
  region: string;
  skillLevel: string;
  image: string;
}

interface Opponent {
  id: string;
  fullName: string | null;
  profilePicture: string | null;
}

interface Match {
  id: string;
  tournamentId: string;
  team1Id: string;
  team2Id: string;
  winnerId: string | null;
  startTime: string;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  round: string;
  createdAt: string;
  updatedAt: string;
  tournament: Tournament;
  opponent: Opponent;
}

export function MatchTable({ members }: { members: Match[] }) {

  return (
    <div className="rounded-lg ">
      <ScrollArea className="">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#161616] ">
              <TableHead className="px-4 py-5 text-primary_highlighted text-sm text-nowrap lg:text-base rounded-l-xl">
                Tournament Name
              </TableHead>
              <TableHead className="px-4 py-5 text-primary_highlighted text-sm text-nowrap md:text-base">
                Game Mode
              </TableHead>
              <TableHead className="px-4 py-5 text-primary_highlighted text-sm text-nowrap md:text-base">
                Date & Time
              </TableHead>
              <TableHead className="px-4 py-5 text-primary_highlighted text-sm text-nowrap md:text-base">
                Opponent
              </TableHead>
              <TableHead className="px-4 py-5 text-primary_highlighted text-sm text-nowrap md:text-base rounded-r-xl">
                Status
              </TableHead>
              <TableHead className="px-4 py-5 text-primary_highlighted text-sm text-nowrap md:text-base rounded-r-xl">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          {
            members?.length > 0 ?
              <TableBody>
                {members.map((member: Match) => (
                  <TableRow
                    key={member.id}
                    className="hover:bg-black/20 text-sm md:text-base"
                  >
                    <TableCell className="font-medium py-6 text-nowrap">
                      {member.tournament.title}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {member.tournament.tournamentType}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {member.tournament.startDate}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {member.opponent.fullName}
                    </TableCell>
                    <TableCell className="text-nowrap">{member.status}</TableCell>
                    <TableCell className="text-nowrap">
                      <Link to={`/tournament-details/${member.id}`}>
                        <span className="hover:text-primary_highlighted hover:cursor-pointer">
                          View Details
                        </span>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> : <NoDataAvailable text='No Match Data available' />
          }
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
