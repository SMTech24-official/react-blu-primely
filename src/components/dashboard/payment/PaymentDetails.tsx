const transaction = {
    date: "2024-02-01T00:00:00.000Z",
    transactionId: "TXN123456",
    tournamentName: "Winter Championship",
    status: "Completed",
    name: "John Doe",
    email: "johndoe@example.com",
    userId: "USER7890",
    amount: 100,
    gameId: "GAME123",
    gameName: "Battle Royale",
    participantGameName: "JD_Warrior"
};

const PaymentDetails = () => {
    return (
        <div className="p-4 bg-card_bg rounded-lg md:space-y-8 space-y-4">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-2xl uppercase">Payment Details</p>
                <div className="border h-full px-4 py-2 rounded-lg">
                    {transaction.status}
                </div>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-4">
                <div className="bg-black p-3 rounded-lg">
                    <p className="text-lg text-primary_highlighted">Billing Information</p>
                    <div className="space-y-4 mt-4">
                        <p><strong>Name:</strong> {transaction.name}</p>
                        <p><strong>Email:</strong> {transaction.email}</p>
                        <p><strong>User ID:</strong> {transaction.userId}</p>
                        <p><strong>Amount:</strong> ${transaction.amount}</p>
                    </div>
                </div>
                <div className="bg-black p-3 rounded-lg">
                    <p className="text-lg text-primary_highlighted">Payment Summary</p>
                    <div className="space-y-4 mt-4">
                        <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                        <p><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</p>
                        <p><strong>Tournament:</strong> {transaction.tournamentName}</p>
                        <p><strong>Game Name:</strong> {transaction.gameName}</p>
                    </div>
                </div>
            </div>
            <div className="bg-black p-3 rounded-lg">
                <p className="text-lg text-primary_highlighted">Game Information</p>
                <div className="gap-4 mt-4 grid grid-cols-1 sm:grid-cols-2">
                    <p><strong>Game ID:</strong> {transaction.gameId}</p>
                    <p><strong>Participant Name:</strong> {transaction.participantGameName}</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
