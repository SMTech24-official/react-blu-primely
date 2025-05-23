
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";
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
                    {
                        matches.length > 0 ? <TableBody>
                            {
                                matches.map((match: TMatch, idx: number) => (
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
                                ))
                            }
                        </TableBody>
                            : <div className="">
                                <NoDataAvailable text='No Tournaments Data available' />
                            </div>
                    }

                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
