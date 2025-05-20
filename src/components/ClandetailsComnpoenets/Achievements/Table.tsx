
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import {
    Table, TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { TMatch } from "./Achievements";


export function TableComponents({ matches }: { matches: TMatch[] }) {
    console.log(matches, "matches");
    return (
        <div className="rounded-lg ">
            <ScrollArea className="">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#161616]">
                            <TableHead className="px-4 py-5 text-primary_highlighted text-sm lg:text-base rounded-l-xl">
                                NO
                            </TableHead>
                            <TableHead className="px-4 py-5 text-primary_highlighted text-sm md:text-base">
                                Tournament
                            </TableHead>
                            <TableHead className="px-4 py-5 text-primary_highlighted text-sm md:text-base">
                                Opponent
                            </TableHead>
                            <TableHead className="px-4 py-5 text-primary_highlighted text-sm md:text-base">
                                Place
                            </TableHead>
                            <TableHead className="px-4 py-5 text-primary_highlighted text-sm md:text-base rounded-r-xl">
                                Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {matches.map((match: TMatch, idx: number) => (
                            <TableRow
                                key={match.id}
                                className="hover:bg-black/20 text-sm md:text-base"
                            >
                                <TableCell className="font-medium py-6">
                                    {idx + 1}
                                </TableCell>
                                <TableCell>{match?.tournament?.title}</TableCell>
                                <TableCell>{match.opponent.name}</TableCell>
                                <TableCell>
                                    {match.position}
                                </TableCell>
                                <TableCell>
                                    {match.startTime.split("T")[0]}
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
