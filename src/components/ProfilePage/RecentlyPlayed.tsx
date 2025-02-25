import RecentMatch from "../allCards/recentMatch/RecentMatch";

interface Match {
    imageSrc: string;
    title: string;
    prize: string;
    date: string;
    entryFee: string;
    teamSize: string;
    regions: string[];
    skillLevel: string;
    badge: string;
    registrationStatus: string;
    enrollmentStatus: string;
    game: string;
    points: number;
}

const fakeMatches: Match[] = [
    {
        imageSrc: "https://via.placeholder.com/150",
        title: "Champions Battle",
        prize: "$5000",
        date: "March 15, 2025",
        entryFee: "$10",
        teamSize: "5v5",
        regions: ["NA", "EU"],
        skillLevel: "Intermediate",
        badge: "Elite",
        registrationStatus: "Open",
        enrollmentStatus: "Enrolled",
        game: "Valorant",
        points: 1200
    },
    {
        imageSrc: "https://via.placeholder.com/150",
        title: "Pro League Finals",
        prize: "$10,000",
        date: "April 10, 2025",
        entryFee: "Free",
        teamSize: "3v3",
        regions: ["Asia", "SA"],
        skillLevel: "Advanced",
        badge: "Champion",
        registrationStatus: "Closed",
        enrollmentStatus: "Completed",
        game: "CS:GO",
        points: 1200
    },
    {
        imageSrc: "https://via.placeholder.com/150",
        title: "Pro League Finals",
        prize: "$10,000",
        date: "April 10, 2025",
        entryFee: "Free",
        teamSize: "3v3",
        regions: ["Asia", "SA"],
        skillLevel: "Advanced",
        badge: "Champion",
        registrationStatus: "Closed",
        enrollmentStatus: "Completed",
        game: "CS:GO",
        points: 1200
    },
    {
        imageSrc: "https://via.placeholder.com/150",
        title: "Pro League Finals",
        prize: "$10,000",
        date: "April 10, 2025",
        entryFee: "Free",
        teamSize: "3v3",
        regions: ["Asia", "SA"],
        skillLevel: "Advanced",
        badge: "Champion",
        registrationStatus: "Closed",
        enrollmentStatus: "Completed",
        game: "CS:GO",
        points: 1200
    }
];

const RecentlyPlayed = () => {
    return (
        <div className="space-y-4">
            <p className="text-xl font-medium uppercase">Recently Played Match</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                {fakeMatches.map((match, index) => (
                    <RecentMatch
                        key={index}
                        title={match.title}
                        prize={match.prize}
                        date={match.date}
                        entryFee={match.entryFee}
                        teamSize={match.teamSize}
                        regions={match.regions}
                        skillLevel={match.skillLevel}
                        registrationStatus={match.registrationStatus}
                        game={match.game}
                        points={match.points}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentlyPlayed;
