import { useState } from "react";
import { PaymentTable } from "./table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DatePickerDemo } from "../../datePicker/Date";
import { Input } from "../../ui/input";
import { useGetAllPaymentsQuery } from "../../../redux/apis/payment/PaymentApi";

const MainPaymentPage = () => {
  const { data, isLoading, isError } = useGetAllPaymentsQuery({ page: 1, limit: 10 });
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [transactionId, setTransactionId] = useState<string>("");

  // Transform API data to match your table format
  const transformedPayments = data?.data?.payments.map(payment => ({
    date: payment.createdAt,
    transactionId: payment.id,
    tournamentName: payment.tournamentName || "", // Use an existing property or provide a fallback
    status: payment.status,
    amount: payment.amount
  })) || [];

  if (isLoading) return <div>Loading payments...</div>;
  if (isError) return <div>Error loading payments</div>;

  return (
    <div className="p-4 bg-card_bg rounded-lg">
      <div className="">
        <p className="font-semibold text-2xl uppercase">Payment History</p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <Input 
            placeholder="Transaction ID" 
            className="w-full h-full border-none" 
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
          
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full bg-transparent border-gray-800">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
              <SelectItem value="REFUNDED">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <DatePickerDemo date={date} setDate={setDate} />
        </div>
      </div>
      <PaymentTable transactions={transformedPayments} />
    </div>
  );
};

export default MainPaymentPage;