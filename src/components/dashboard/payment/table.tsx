import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import {
  Table, TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";

interface Transaction {
  date: string;
  transactionId: string;
  tournamentName: string;
  status: string;
  amount?: number;
  stripePaymentId?: string;
}

export function PaymentTable({ transactions }: { transactions: Transaction[] }) {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "COMPLETED":
        return "text-green-500";
      case "PENDING":
        return "text-yellow-500";
      case "FAILED":
        return "text-red-500";
      case "REFUNDED":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="rounded-lg">
      <ScrollArea className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-14 lg:px-4 py-5 text-sm text-primary_highlighted text-nowrap lg:text-base">
                Date
              </TableHead>
              <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                Transaction ID
              </TableHead>
              <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                Tournament
              </TableHead>
              <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                Amount
              </TableHead>
              <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                Status
              </TableHead>
              <TableHead className="px-4 py-5 text-sm text-primary_highlighted text-nowrap md:text-base">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.transactionId}
                className="hover:bg-black/20 text-sm md:text-base"
              >
                <TableCell className="font-medium py-6">
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-medium py-6">
                  {transaction.stripePaymentId || transaction.transactionId}
                </TableCell>
                <TableCell>
                  {transaction.tournamentName}
                </TableCell>
                <TableCell>
                  ${transaction.amount?.toFixed(2)}
                </TableCell>
                <TableCell className={`px-4 py-2 ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </TableCell>
                <TableCell>
                  <Link 
                    to={`/dashboard/payment/${transaction.transactionId}`} 
                    className="hover:text-primary_highlighted hover:underline transition-all duration-300"
                  >
                    View
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