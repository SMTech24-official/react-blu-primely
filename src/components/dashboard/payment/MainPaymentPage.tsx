import { useState } from "react";
import { PaymentTable } from "./table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DatePickerDemo } from "../../datePicker/Date";
import { Input } from "../../ui/input";


const transactions = [
    {
        date: "2024-02-01T00:00:00.000Z",
        transactionId: "TXN123456",
        tournamentName: "Winter Championship",
        status: "Completed"
    },
    {
        date: "2024-01-28T00:00:00.000Z",
        transactionId: "TXN789012",
        tournamentName: "Spring Showdown",
        status: "Pending"
    },
    {
        date: "2024-01-15T00:00:00.000Z",
        transactionId: "TXN345678",
        tournamentName: "Autumn Battle",
        status: "Failed"
    },
    {
        date: "2023-12-20T00:00:00.000Z",
        transactionId: "TXN901234",
        tournamentName: "Summer Clash",
        status: "Completed"
    },
    {
        date: "2023-11-10T00:00:00.000Z",
        transactionId: "TXN567890",
        tournamentName: "Year-End Cup",
        status: "Refunded"
    }
];


const MainPaymentPage = () => {

    const [selectedGame, setSelectedGame] = useState<string>("successFull");
    const [date, setDate] = useState<Date>()


    return (
        <div className="p-4 bg-card_bg rounded-lg">
            <div className="">
                <p className="font-semibold text-2xl uppercase">Payment History</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                    <Input placeholder="Transactions Id" className="w-full h-full border-none" />
                    <Select value={selectedGame} onValueChange={setSelectedGame}>
                        <SelectTrigger className="w-full bg-transparent border-gray-800">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="successFull">SuccessFull</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>

                    <DatePickerDemo date={date} setDate={setDate} />
                </div>
            </div>
            <PaymentTable transactions={transactions} />
        </div>
    );
};

export default MainPaymentPage;