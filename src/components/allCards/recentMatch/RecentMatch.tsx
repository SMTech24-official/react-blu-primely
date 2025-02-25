interface Match {
    title: string;
    prize: string;
    date: string;
    entryFee: string;
    teamSize: string;
    regions: string[];
    skillLevel: string;
    registrationStatus: string;
    game: string;
    points: number;
}

const RecentMatch: React.FC<Match> = ({
    title,
    prize,
    date,
    entryFee,
    teamSize,
    regions,
    skillLevel,
    game,
    points
}) => {
    return (
        <div className="bg-fourthColor  rounded-lg p-5 w-full max-w-sm shadow-lg">
            <div className=" space-y-3">
                <div className="text-center flex items-center  justify-center">
                    <p className="logo text-2xl  px-3 py-4  uppercase w-fit leading-4">{game}</p>
                </div>

                <p className=" font-bold text-lg mt-1">{title}</p>
                <p className=" text-sm">{date}</p>
                <div className="mt-2 flex items-center justify-between gap-2">
                    <p>Skill Level </p>
                    <p className="p-1 border border-secondary_highlighted text-secondary_highlighted w-fit text-xs  mt-2">{skillLevel}</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                    <p>Prize </p>
                    <p className="">{prize}</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                    <p>Entry Fee </p>
                    <p className="">{entryFee}</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                    <p>Team Size </p>
                    <p className="">{teamSize}</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                    <p>Regions </p>
                    <p className="">{regions.join(" , ")}</p>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 py-4 border-t border-gray-700">
                    <p>Points </p>
                    <p className="">{points}</p>
                </div>

            </div>
        </div>
    );
};

export default RecentMatch;
