import { Link } from "react-router-dom";
import PrimaryButton from "../../shared/primaryButton";

const TournamentsInfo = ({ title, prize, gameName, entryFee, date, maxTeams }: { title: string, prize: { totalPrize: number, firstPrize: number, secondPrize: number, thirdPrize: number }, gameName: string, entryFee: number, date: string, maxTeams: number }) => {
    return (
        <div className="lg:p-8 md:p-6 shadow-xl rounded-lg bg-card_bg">
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start justify-center lg:gap-10 md:gap-8 lg:mb-8 md:mb-6 mb-4">
                <div>
                    <div className="space-y-2 ">
                        <p className="text-lg font-semibold">{title}</p>
                        <p>Dec 10, 3:00 PM From 15, 2024 6:00 PM</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <p className="logo text-xs px-1 py-[2px] border uppercase">{gameName}</p>
                        <div className="text-sm font-semibold p-1 rounded-lg  text-primary_highlighted">
                            <p>Max Team: {maxTeams}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2 lg:space-y-3">
                        <div className="text-lg font-semibold flex items-center gap-2">
                            <p className="text-lg font-semibold">Prize Pool</p>
                            <span className="text-primary_highlighted">||</span>
                            <p className="text-lg font-semibold">Total: ${prize.totalPrize}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold ">
                            <p className="">1st: ${prize.firstPrize}</p>
                            <span>|</span>
                            <p className="">2nd: ${prize.secondPrize}</p>
                            <span>|</span>
                            <p className="">3rd: ${prize.thirdPrize} </p>
                        </div>
                    </div>
                    <div className="space-y-2 lg:space-y-3">
                        <p className="text-lg font-semibold">
                            Registration
                        </p>
                        <p className="flex items-center gap-1 text-gray-500 font-semibold ">
                            <span>Entry Fee: ${entryFee}</span> | <span>Deadline: {new Date(date).toDateString()}</span>
                        </p>
                    </div>
                </div>
            </div>
            <PrimaryButton parent="w-full">
                <Link to={`/tournaments-details/freefire`}>
                    View tournaments
                </Link>
            </PrimaryButton>
        </div>
    );
};

export default TournamentsInfo;