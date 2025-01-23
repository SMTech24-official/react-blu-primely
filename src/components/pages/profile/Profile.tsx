

import fortnite from "@/assets/banner/fortnite-og-social-1920x1080-a5adda66fab9.jpg";
import { Edit } from "lucide-react";
import avater from "../../../assets/player/avater 1.jpg";
import { Button } from "../../ui/button";
import rank from "../../../assets/rankAndTrophies/rank.png"

const Profile = () => {
    return (
        <div>
            <div className="relative w-full h-[500px]">

                <div style={{
                    backgroundImage: `url("${fortnite}")`

                }} className="w-full h-[600px] relative bg-cover bg-no-repeat">
                </div>
                <div className="z-20 absolute top-2/3 lg:w-4/5 xl:w-3/4 h-80 mx-auto inset-0 bg-black  space-y-6 px-10 py-6 rounded-2xl">
                    <div className="flex items-center gap-4">
                        <div className="css_bg p-[2px] rounded-full">
                            <img src={avater} alt="your avater" className="w-32 rounded-full" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-10">
                                <div>
                                    <h2 className="text-2xl font-semibold">Tahsin0909</h2>
                                </div>
                                <div className="css_bg p-[2px] rounded-md">
                                    <div className="flex items-center bg-black p-3 gap-2 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                            <path d="M0.5 7.61111L12.5 24.5L24.5 7.61111L17.6429 0.5H7.35714L0.5 7.61111Z" fill="#FFC431" />
                                            <path d="M12.5 0.5L18.5 7.61111L17.6429 0.5H12.5Z" fill="#FFB401" />
                                            <path d="M7.35714 0.5L6.5 7.61111L12.5 0.5H7.35714Z" fill="#FFB401" />
                                            <path d="M13 24.8889L19 8H25L13 24.8889Z" fill="#FFA100" />
                                            <path d="M0.5 7.61133H6.5L12.5 24.5002L0.5 7.61133Z" fill="#FFB401" />
                                            <path d="M6.5 7.61111L12.5 0.5L18.5 7.61111H6.5Z" fill="#FFD873" />
                                        </svg>
                                        <p className="text-xl third_highlighted">
                                            Elite Member
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    className="bg-primary_highlighted hover:bg-blue-600 text-white flex items-center gap-2"
                                >
                                    Create Clan <Edit size={16} />
                                </Button>
                            </div>
                            <div>
                                <p>Joined : 90/09/23234</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p>Game ID:</p>
                                <div className="flex items-center gap-1 ">
                                    <p className="px-1 text-primary_highlighted border-primary_highlighted py-[2px] border rounded-md text-sm">Free Fire</p>
                                    <p>#322242ddd</p>
                                </div>
                                <div className="flex items-center gap-1 ">
                                    <p className="px-1 text-primary_highlighted border-primary_highlighted py-[2px] border rounded-md text-sm">CS-GO</p>
                                    <p>#322242ddd</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 max-w-3xl gap-6 ">
                        <div className="flex items-center py-4 px-6 border-[1px] border-gray-600 rounded-md gap-4">
                            <img src={rank} alt="" className="w-20" />
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-semibold text-primary_highlighted uppercase">Rank</p>
                                <p className="font-bold">1212</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-4 px-6 border-[1px] border-gray-600 rounded-md gap-2">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-semibold text-primary_highlighted uppercase">Tournaments</p>
                                <p className="font-bold">1212</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-4 px-6 border-[1px] border-gray-600 rounded-md gap-2">
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-semibold text-primary_highlighted uppercase">Earnings</p>
                                <p className="font-bold">$1212</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;