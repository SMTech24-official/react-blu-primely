import { Link } from "react-router-dom";
import PrimaryButton from "../../shared/primaryButton";

const TournamentsInfo = ({ title, prize, gameName, entryFee, date, maxTeams, fixture = false, imageSrc, teamSize, regions, skillLevel, createdAt, tournamentType, status }: { title: string, prize: { totalPrize: number, firstPrize: number, secondPrize: number, thirdPrize: number }, status?: string, gameName: string, entryFee: number, date: string, maxTeams: number, imageSrc?: string, teamSize?: string, regions?: string, skillLevel?: string, createdAt: string, tournamentType?: string, fixture?: boolean }) => {

    return (
        <div className="lg:p-8 md:p-6 shadow-xl rounded-lg bg-card_bg">
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start justify-center lg:gap-6 md:gap-4 lg:mb-8 sm:gap-4 md:mb-6 mb-4">
                {imageSrc && <div className="w-[150px] h-[200px] rounded-lg block">
                    <img src={imageSrc} className="w-[150px] h-[180px] object-fill rounded-lg" />
                    {
                        status && <div className={`border p-1 mt-2 text-xs uppercase text-center  ${status === "active" ? "border-green-500 text-green-600" : status === "upcoming" ? "border-blue-500 text-blue-600" : status === "cancelled" ? "border-red-500 text-red-600" : ""}`}>
                            {status}
                        </div>
                    }
                </div>}

                <div className="flex flex-col  w-full mt-8 sm:mt-0 ">
                    <div className="flex lg:flex-row flex-col   lg:gap-0 gap-2 items-start justify-between">
                        <div>
                            <div className="space-y-2 ">
                                <p className="text-lg font-semibold text-nowrap mr-3">{title}</p>
                                <p>Create At: {createdAt}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <p className="logo text-xs px-1 py-[2px] border uppercase">{gameName}</p>
                                <div className="text-sm font-semibold p-1 rounded-lg  text-primary_highlighted">
                                    <p>Max Team: {maxTeams}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-1 border border-secondary_highlighted text-secondary_highlighted w-fit text-xs  mt-2">
                                    {tournamentType}
                                </div>
                                <div className={`border p-1 mt-2 text-xs uppercase text-center  ${status === "active" ? "border-green-500 text-green-600" : status === "upcoming" ? "border-blue-500 text-blue-600" : status === "cancelled" ? "border-red-500 text-red-600" : ""}`}>
                                    {status}
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
                                <p className="flex 2xl:flex-row flex-col 2xl:items-center gap-1 text-gray-500 font-semibold ">
                                    <span className="text-nowrap 2xl:pr-2 2xl:border-r">Entry Fee: ${entryFee}</span>  <span className="text-nowrap 2xl:pl-1">Deadline: {new Date(date).toLocaleDateString("en-GB").replace(/\//g, "/")}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    {
                        teamSize && regions && skillLevel && <div className="grid grid-cols-2  md:grid-cols-4 gap-4 text-sm my-6 w-full ">
                            <div className="space-y-[10px]">
                                <div className="text-gray-400">ENTRY/PLAYER</div>
                                <div>{entryFee}</div>
                            </div>
                            <div className="space-y-[10px]">
                                <div className="text-gray-400">TEAM SIZE</div>
                                <div>{teamSize}</div>
                            </div>
                            <div className="space-y-[10px]">
                                <div className="text-gray-400">REGIONS</div>
                                <div>{regions}</div>
                            </div>
                            <div className="space-y-[10px]">
                                <div className="text-gray-400">SKILL LEVEL</div>
                                <div>{skillLevel}</div>
                            </div>
                        </div>
                    }

                </div>
            </div>

            <PrimaryButton parent="w-full">
                <Link to={fixture ? `/dashboard/fixture/${gameName}` : `/dashboard/tournaments/${gameName}`}>
                    View tournaments
                </Link>
            </PrimaryButton>
        </div>
    );
};

export default TournamentsInfo;