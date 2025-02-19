import { PaymentTable } from "../../payment/table";

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
const FinancialTab = () => {
    return (
        <div>
            <PaymentTable transactions={transactions} />
        </div>
    );
};

export default FinancialTab;