import EliteTrophie from "@/assets/leaderboard/elite-trophies.png";
import GoldTrophie from "@/assets/leaderboard/gold-trophies.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "../../../ui/scroll-area";
import { LeaderboardEntry } from "../../../../types/types";

export function LeaderboardTable({
  members,
}: {
  members: { data: LeaderboardEntry[] };
}) {

  return (
    <div className="rounded-lg">
      <ScrollArea className="">
        <Table>
          <TableHeader>
            <TableRow className="">
              <TableHead className="px-14 lg:px-4 py-5 text-sm lg:text-base text-primary_highlighted rounded-l-xl">
                Rank
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base text-primary_highlighted">
                XP
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base text-primary_highlighted">
                Earning
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base text-primary_highlighted">
                Elite Trophies
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base text-primary_highlighted rounded-r-xl">
                Gold Trophies
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.data.map((member) => (
              <TableRow
                key={member.id}
                className="hover:bg-black/20 text-sm md:text-base"
              >
                <TableCell className="font-medium py-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={
                        member.user?.profilePicture ||
                        member.clan?.logo ||
                        "https://img.freepik.com/free-photo/user-profile-interface-sign-symbol-icon-3d-rendering_56104-1956.jpg?ga=GA1.1.603131680.1747477038&semt=ais_hybrid&w=740"
                      }
                      alt={member.user?.fullName || member.clan?.name}
                      width={40}
                      height={40}
                      className="rounded-full aspect-square"
                    />
                    {member.user?.fullName || member.clan?.name}
                  </div>
                </TableCell>
                <TableCell>{member?.exp}</TableCell>
                <TableCell>${member?.totalEarnings}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <img
                      src={EliteTrophie}
                      alt="Elite Trophy"
                      width={30}
                      height={30}
                    />
                    {member?.eliteTrophies}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <img
                      src={GoldTrophie}
                      alt="Gold Trophy"
                      width={30}
                      height={30}
                    />
                    {member?.goldTrophies}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
