import TournamentsInfo from "../../../allCards/tournmentsInfoCard/TournamentsInfo";

const tournaments: {
    title: string;
    prize: { totalPrize: number; firstPrize: number; secondPrize: number; thirdPrize: number };
    gameName: string;
    entryFee: number;
    date: string;
    maxTeams: number;
}[] = [
        {
            title: "Battle Royale Championship",
            prize: {
                totalPrize: 5000,
                firstPrize: 2000,
                secondPrize: 1500,
                thirdPrize: 1000,
            },
            gameName: "Battle Royale",
            entryFee: 50,
            date: "2025-03-15",
            maxTeams: 20,
        },
        {
            title: "FPS Masters",
            prize: {
                totalPrize: 3000,
                firstPrize: 1200,
                secondPrize: 800,
                thirdPrize: 500,
            },
            gameName: "Call of Duty",
            entryFee: 30,
            date: "2025-04-10",
            maxTeams: 16,
        },
        {
            title: "MOBA Showdown",
            prize: {
                totalPrize: 4000,
                firstPrize: 1800,
                secondPrize: 1200,
                thirdPrize: 700,
            },
            gameName: "League of Legends",
            entryFee: 40,
            date: "2025-05-05",
            maxTeams: 24,
        },
    ];

const RecentAll = () => {
    return (
        <div className="grid lg:grid-cols-2 gap-10">
            <div>
                <h1 className="text-lg font-semibold text-primary_highlighted my-3">🏆 New Tournament Created</h1>
                <div className="flex flex-col gap-3">
                    {tournaments.map((data, idx) => (
                        <TournamentsInfo
                            key={idx}
                            title={data.title}
                            prize={data.prize}
                            date={data.date}
                            entryFee={data.entryFee}
                            gameName={data.gameName}
                            maxTeams={data.maxTeams}
                        />
                    ))}
                </div>
            </div>

            <div className="">
                <h1 className="text-lg font-semibold text-primary_highlighted my-3">👤 Player Registered</h1>
                {/* You can add more content here if needed */}
            </div>
        </div>
    );
};

export default RecentAll;
