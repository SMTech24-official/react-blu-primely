/* eslint-disable @typescript-eslint/no-explicit-any */


import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import {
    Table, TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";

// interface ClanTableProps {
//     members: {
//         id: string;
//         avatar: string;
//         name: string;
//         xp: number;
//         earning: number;
//         eliteTrophies: number;
//         goldTrophies: number;
//     }[];
// }

export function TableComponents<T>({ members }: { members: T[] }) {
    return (
        <div className="rounded-lg ">
            <ScrollArea className="">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#161616]">
                            <TableHead className="px-14 lg:px-4 py-5 text-sm lg:text-base rounded-l-xl">
                                NO
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm md:text-base">
                                Tournament
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm md:text-base">
                                Team
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm md:text-base">
                                Place
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm md:text-base rounded-r-xl">
                                Year
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member: any, idx: number) => (
                            <TableRow
                                key={member.id}
                                className="hover:bg-black/20 text-sm md:text-base"
                            >
                                <TableCell className="font-medium py-6">
                                    {idx + 1}
                                </TableCell>
                                <TableCell>{member.tournament}</TableCell>
                                <TableCell>{member.team}</TableCell>
                                <TableCell>
                                    {member.place}
                                </TableCell>
                                <TableCell>
                                    {member.year}
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
