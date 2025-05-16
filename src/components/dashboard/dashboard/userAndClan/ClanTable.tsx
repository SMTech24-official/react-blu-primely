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
import { Clan } from "../../../../redux/types";
import { ScrollBar } from "../../../ui/scroll-area";
import image from "@/assets/leaderboard/leader-profile-picture.png";
import Loading from "../../../others/Loading";
import NotFound from "../../../others/NotFound";

export function ClanTable({
  members,
  ClanLoading,
}: {
  members: Clan[] | null;
  ClanLoading: boolean;
}) {
  console.log(members);
  if (ClanLoading) {
    return <Loading />;
  }

  // Handle null case explicitly
  if (!members) {
    return <NotFound />;
  }

  return (
    <div className="rounded-lg ">
      {members?.length > 0 ? (
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
              {members?.map((member: Clan) => (
                <TableRow
                  key={member.id}
                  className="hover:bg-black/20 text-sm md:text-base"
                >
                  <TableCell className="font-medium py-6">
                    <div className="flex items-center gap-6">
                      <img
                        src={member.ClanMember[0].user.profilePicture || image}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      {member.name}
                    </div>
                  </TableCell>
                  <TableCell>{member.ClanStats?.exp}</TableCell>
                  <TableCell>${member.ClanStats?.exp}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <img
                        src={EliteTrophie}
                        alt="Elite Trophy"
                        width={30}
                        height={30}
                      />
                      {member.ClanStats?.eliteTrophies}
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
                      {member.ClanStats?.goldTrophies}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
