// Importing necessary assets and components
import fortnite from "@/assets/banner/joysticks-dark-background.jpg";
import { Edit } from "lucide-react";
import avater from "@/assets/player/avater 1.jpg";
import rank from "@/assets/rankAndTrophies/rank.png";
import trophy from "@/assets/rankAndTrophies/trophy.png";
import earn from "@/assets/rankAndTrophies/earn.png";
import { Button } from "../ui/button";
import LogoLike from "../others/LogoLike";

// Profile Component
const ProfilePage = () => {
    return (
        <div className="relative">
            {/* Background Image Section */}
            <div className="relative w-full h-full lg:h-[500px]">
                <div
                    style={{
                        backgroundImage: `url("${fortnite}")`
                    }}
                    className="w-full hidden sm:block lg:h-[400px] h-[300px] relative lg:bg-cover lg:object-contain bg-contain bg-center bg-no-repeat">
                </div>

                {/* Profile Card */}
                <div className="z-20 sm:absolute top-1/2 h-full w-full md:w-4/5 sm:max-h-[300px] lg:max-h-[300px] lg:max-w-[1150px] mx-auto inset-0 bg-black space-y-6 px-10 py-6 rounded-2xl">

                    {/* Profile Info Section */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="css_bg p-[1px] rounded-full">
                            {/* Avatar Image */}
                            <img src={avater} alt="your avatar" className="lg:w-32 w-24 h-24 md:w-28 md:h-28 lg:h-32 rounded-full" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap items-center gap-4 md:gap-6 lg:gap-10">
                                <div>
                                    {/* Username */}
                                    <h2 className="md:text-[30px] text-xl lg:text-[40px] font-semibold">Tahsin0909</h2>
                                </div>

                                {/* Elite Member Badge */}
                                <div className="css_bg p-[1px] rounded-md">
                                    <div className="flex items-center bg-card_bg p-2 lg:p-3 gap-2 rounded-md">
                                        {/* Star Icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M0.5 7.61111L12.5 24.5L24.5 7.61111L17.6429 0.5H7.35714L0.5 7.61111Z" fill="#FFC431" />
                                            <path d="M12.5 0.5L18.5 7.61111L17.6429 0.5H12.5Z" fill="#FFB401" />
                                            <path d="M7.35714 0.5L6.5 7.61111L12.5 0.5H7.35714Z" fill="#FFB401" />
                                            <path d="M13 24.8889L19 8H25L13 24.8889Z" fill="#FFA100" />
                                            <path d="M0.5 7.61133H6.5L12.5 24.5002L0.5 7.61133Z" fill="#FFB401" />
                                            <path d="M6.5 7.61111L12.5 0.5L18.5 7.61111H6.5Z" fill="#FFD873" />
                                        </svg>
                                        <p className="text-nowrap lg:text-xl third_highlighted">Elite Member</p>
                                    </div>
                                </div>

                                {/* Create Clan Button */}
                                <Button className="bg-primary_highlighted hover:bg-blue-600 text-white flex items-center gap-2">
                                    Create Clan <Edit size={16} />
                                </Button>
                            </div>

                            {/* Joined Date */}
                            <div>
                                <p className="text-base lg:text-[20px]">Joined : 90/09/23234</p>
                            </div>

                            {/* Game IDs */}
                            <div className="flex flex-wrap items-center gap-2 text-[16px]">
                                <p>Game ID:</p>
                                <LogoLike game="Free Fire" gameId="#tahsin0909" />
                                <LogoLike game="Pubg" gameId="#tahsin0909" />
                            </div>
                        </div>
                    </div>

                    {/* Profile Stats */}
                    <div className="grid sm:grid-cols-3  gap-3 mt-10">

                        {/* Rank */}
                        <div className="flex justify-center items-center md:py-3 lg:py-4  md:px-4 lg:px-6 px-3 py-2 border-[1px] border-gray-600 rounded-md gap-2 lg:gap-4">
                            <img src={rank} alt="Rank" className="md:w-12 lg:w-20 w-14" />
                            <div className="flex flex-col items-center justify-center">
                                <p className="md:text-sm lg:text-lg 2xl:text-2xl font-semibold text-primary_highlighted uppercase">Rank</p>
                                <p className="font-bold">1212</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center md:py-3 lg:py-4  md:px-4 lg:px-6 px-3 py-2 border-[1px] border-gray-600 rounded-md gap-2 lg:gap-4">
                            <img src={trophy} alt="Rank" className="md:w-12 lg:w-20 w-14" />
                            <div className="flex flex-col items-center justify-center">
                                <p className="md:text-sm lg:text-lg 2xl:text-2xl font-semibold text-primary_highlighted uppercase">Tournaments</p>
                                <p className="font-bold">1212</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center md:py-3 lg:py-4  md:px-4 lg:px-6 px-3 py-2 border-[1px] border-gray-600 rounded-md gap-2 lg:gap-4">
                            <img src={earn} alt="Rank" className="md:w-12 lg:w-20 w-14" />
                            <div className="flex flex-col items-center justify-center">
                                <p className="md:text-sm lg:text-lg 2xl:text-2xl font-semibold text-primary_highlighted uppercase">Earnings</p>
                                <p className="font-bold">1212</p>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
