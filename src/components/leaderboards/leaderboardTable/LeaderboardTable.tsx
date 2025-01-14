import EliteTrophie from "@/assets/leaderboard/elite-trophies.png";
import GoldTrophie from "@/assets/leaderboard/gold-trophies.png";
import {
  Table, TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";

interface ClanTableProps {
  members: {
    id: string;
    avatar: string;
    name: string;
    xp: number;
    earning: number;
    eliteTrophies: number;
    goldTrophies: number;
  }[];
}

export function LeaderboardTable({ members }: ClanTableProps) {
  return (
    <div className="rounded-lg ">
      <ScrollArea className="">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#161616]">
              <TableHead className="px-14 lg:px-4 py-5 text-sm lg:text-base rounded-l-xl">
                Rank
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base">
                XP
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base">
                Earning
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base">
                Elite Trophies
              </TableHead>
              <TableHead className="px-4 py-5 text-sm md:text-base rounded-r-xl">
                Gold Trophies
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow
                key={member.id}
                className="hover:bg-black/20 text-sm md:text-base"
              >
                <TableCell className="font-medium py-6">
                  <div className="flex items-center gap-6">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {member.name}
                  </div>
                </TableCell>
                <TableCell>{member.xp.toLocaleString()}</TableCell>
                <TableCell>${member.earning.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <img
                      src={EliteTrophie}
                      alt="Elite Trophy"
                      width={30}
                      height={30}
                    />
                    {member.eliteTrophies}
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
                    {member.goldTrophies}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="p-4 text-center">
        <button className="text-blue-500 hover:underline">View top 10</button>
      </div>
    </div>
  );
}
