import { useState } from "react"
import { Pencil } from "lucide-react"
import { MainModal } from "../Modal/MainModal"
import PrimaryButton from "../shared/primaryButton"
import { useForm } from "react-hook-form";
import { ClanFormData } from "../../types/types";







export default function OverviewTab() {
    const [missionModalOpen, setMissionModalOpen] = useState(false)
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

    const { register, handleSubmit } = useForm<ClanFormData>({
        defaultValues: {
            mission: "",
            values: "",
        },
    });


    const onSubmit = (data: ClanFormData) => {
        console.log("Clan Data:", data);
    };

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
                                <div className="sm:w-32 w-24 h-24 sm:h-32 rounded-full bg-black flex items-center justify-center ">
                                    <span className="text-2xl font-bold">1,245</span>
                                </div>
                            </div>
                            <span className="text-gray-300 text-center">Matches Played</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="css_bg p-[2px] rounded-full mb-2">
                                <div className="sm:w-32 w-24 h-24 sm:h-32 rounded-full bg-black flex items-center justify-center ">
                                    <span className="text-2xl font-bold">1,245</span>
                                </div>
                            </div>
                            <span className="text-gray-300 text-center">Win Rate</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="css_bg p-[2px] rounded-full mb-2">
                                <div className="sm:w-32 w-24 h-24 sm:h-32 rounded-full bg-black flex items-center justify-center ">
                                    <span className="text-2xl font-bold">1,245</span>
                                </div>
                            </div>
                            <span className="text-gray-300 text-center">Current Global Ranking</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="css_bg p-[2px] rounded-full mb-2">
                                <div className="sm:w-32 w-24 h-24 sm:h-32 rounded-full bg-black flex items-center justify-center ">
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
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Mission Statement */}
                        <div>
                            <label className="block mb-1">Mission:</label>
                            <textarea
                                {...register("mission", { required: "Mission is required" })}
                                className="w-full p-2 rounded bg-card_bg border border-gray-700"
                                placeholder="Describe your clan's mission"
                            />
                        </div>

                        {/* Clan Values */}
                        <div>
                            <label className="block mb-1">Clan Values:</label>
                            <textarea
                                {...register("values", { required: "Values are required" })}
                                className="w-full p-2 rounded bg-card_bg border border-gray-700"
                                placeholder="Enter your clan values"
                            />
                        </div>



                        {/* Submit Button */}
                        <PrimaryButton child="w-full" parent="w-full">
                            <button
                                type="submit"
                                className="w-full  rounded text-white font-bold"
                            >
                                Submit
                            </button>
                        </PrimaryButton>
                    </form>
                </MainModal>

            </div>
        </div>
    )
}

