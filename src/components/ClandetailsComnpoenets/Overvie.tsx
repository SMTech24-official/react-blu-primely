/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { Pencil } from "lucide-react"
import { MainModal } from "../Modal/MainModal"

export default function OverviewTab() {
    const [missionModalOpen, setMissionModalOpen] = useState(false)
    const [valuesModalOpen, setValuesModalOpen] = useState(false)
    // setData
    const [data,] = useState({
        mission:
            "To foster a competitive yet supportive environment where gamers can connect, improve their skills, and achieve greatness together",
        values: {
            teamwork: "We believe in the power of collaboration and trust among our members",
            excellence: "Every game is an opportunity to grow and excel",
            respect: "We value sportsmanship, whether in victory or defeat",
        },
    })

    // const handleSave = (newData: any) => {
    //     setData({ ...data, ...newData })
    // }

    return (
        <div className="">
            <div className="space-y-10 md:space-y-14 lg:space-y-20">
                {/* Mission Section */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl font-bold">OUR MISSION</h2>
                        <button onClick={() => setMissionModalOpen(true)} className="text-gray-400 hover:text-white">
                            <Pencil className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-gray-300">{data.mission}</p>
                </div>

                {/* Values Section */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl font-bold">CORE VALUES</h2>
                        <button onClick={() => setValuesModalOpen(true)} className="text-gray-400 hover:text-white">
                            <Pencil className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        <p>
                            <span className="font-bold">TEAMWORK : </span>
                            <span className="text-gray-300">{data.values.teamwork}</span>
                        </p>
                        <p>
                            <span className="font-bold">EXCELLENCE : </span>
                            <span className="text-gray-300">{data.values.excellence}</span>
                        </p>
                        <p>
                            <span className="font-bold">RESPECT : </span>
                            <span className="text-gray-300">{data.values.respect}</span>
                        </p>
                    </div>
                </div>

                {/* Clan Highlights */}
                <div>
                    <h2 className="text-xl font-bold mb-8">CLAN HIGHLIGHTS</h2>
                    <div className="grid grid-cols-4 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="css_bg p-[2px] rounded-full mb-2">
                                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center ">
                                    <span className="text-2xl font-bold">1,245</span>
                                </div>
                            </div>
                            <span className="text-gray-300 text-center">Matches Played</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="css_bg p-[2px] rounded-full mb-2">
                                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center ">
                                    <span className="text-2xl font-bold">1,245</span>
                                </div>
                            </div>
                            <span className="text-gray-300 text-center">Win Rate</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="css_bg p-[2px] rounded-full mb-2">
                                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center ">
                                    <span className="text-2xl font-bold">1,245</span>
                                </div>
                            </div>
                            <span className="text-gray-300 text-center">Current Global Ranking</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="css_bg p-[2px] rounded-full mb-2">
                                <div className="w-32 h-32 rounded-full bg-black flex items-center justify-center ">
                                    <span className="text-2xl font-bold">1,245</span>
                                </div>
                            </div>
                            <span className="text-gray-300 text-center">Matches Played</span>
                        </div>
                    </div>
                </div>

                {/* Join the Fight */}
                <div>
                    <h2 className="text-xl font-bold mb-4">JOIN THE FIGHT</h2>
                    <p className="text-gray-300">
                        Ready to join the action? We're always looking for passionate gamers to grow our clan. Whether you're a
                        sharpshooter, a tactical genius, or a supportive team player, there's a place for you here!
                    </p>
                </div>

                {/* Modals */}
                <MainModal
                    isOpen={missionModalOpen}
                    onClose={() => setMissionModalOpen(false)}
                >
                    ssd
                </MainModal>
                <MainModal
                    isOpen={valuesModalOpen}
                    onClose={() => setValuesModalOpen(false)}
                >
                    ss
                </MainModal>
            </div>
        </div>
    )
}

