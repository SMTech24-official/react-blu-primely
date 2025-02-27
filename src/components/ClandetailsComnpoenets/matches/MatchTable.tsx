/* eslint-disable @typescript-eslint/no-explicit-any */


import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import {
    Table, TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";



export function MatchTable<T>({ members }: { members: T[] }) {
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
                    <TableBody>
                        {members.map((member: any) => (
                            <TableRow
                                key={member.id}
                                className="hover:bg-black/20 text-sm md:text-base"
                            >
                                <TableCell className="font-medium py-6 text-nowrap">
                                    {member.tournamentName}
                                </TableCell>
                                <TableCell className="text-nowrap">{member.gameMode}</TableCell>
                                <TableCell className="text-nowrap">{member.dateTime}</TableCell>
                                <TableCell className="text-nowrap">
                                    {member.opponent}
                                </TableCell>
                                <TableCell className="text-nowrap">
                                    {member.status}
                                </TableCell>
                                <TableCell className="text-nowrap">
                                    <Link to={`/tournament-details/freefire`}>
                                        <span className="hover:text-primary_highlighted hover:cursor-pointer">View Details</span>
                                    </Link>
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
