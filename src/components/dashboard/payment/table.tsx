import { Transaction } from "../../../types/types";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import {
    Table, TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";


export function PaymentTable({ transactions }: { transactions: Transaction[] }) {

    const getStatusColor = (status: string): string => {
        switch (status) {
            case "Completed":
                return "text-green-500"; // Green for Completed
            case "Pending":
                return "text-yellow-500"; // Yellow for Pending
            case "Failed":
                return "text-red-500"; // Red for Failed
            case "Refunded":
                return "text-blue-500"; // Blue for Refunded
            default:
                return "text-gray-500"; // Default gray for unknown status
        }
    };


    return (
        <div className="rounded-lg ">
            <ScrollArea className="">
                <Table>
                    <TableHeader>
                        <TableRow className="">
                            <TableHead className="px-14 lg:px-4 py-5 text-sm text-primary_highlighted text-nowrap lg:text-base">
                                Date
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                Transaction ID
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                Tournments name
                            </TableHead>
                            <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction, idx) => (
                            <TableRow
                                key={idx}
                                className="hover:bg-black/20 text-sm md:text-base"
                            >
                                <TableCell className="font-medium py-6">
                                    {new Date(transaction.date).toLocaleDateString()}

                                </TableCell>
                                <TableCell className="font-medium py-6">
                                    {transaction.transactionId}

                                </TableCell>

                                <TableCell>
                                    {transaction.tournamentName}
                                </TableCell>
                                <TableCell className={`px-4 py-2 text-white ${getStatusColor(transaction.status)}`}>
                                    {transaction.status}
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
