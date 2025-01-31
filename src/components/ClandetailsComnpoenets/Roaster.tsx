import { Plus } from "lucide-react";
import PrimaryButton from "../shared/primaryButton";
import { useState } from "react";
import { MainModal } from "../Modal/MainModal";


const memberList = [
    {
        name: "Alex Johnson",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        name: "Sophia Martinez",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        name: "James Anderson",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        name: "Olivia Brown",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        name: "Ethan Wilson",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
];




const Roaster = ({ players }: {
    players: {
        name: string;
        discordId: string;
        avatar: string;
    }[]
}) => {

    const [open, setOpen] = useState(false)



    return (

        <div className="flex flex-col gap-4 ">

            <PrimaryButton parent="my-2">
                <button onClick={() => setOpen(true)} className="flex items-center">
                    <span>Invite</span> <Plus className="w-4 h-4" />
                </button>
            </PrimaryButton>
            {
                players?.map((data, idx) => <div key={idx} className="flex bg-[#1D1D1D] items-center justify-between p-4 md:p-8 rounded-lg">
                    <div className="flex items-center gap-3">
                        <img
                            src={data.avatar}
                            alt={`${data.name} logo`}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <h3 className="text-lg font-semibold">{data.name}</h3>
                    </div>
                    <p>{data.discordId}</p>
                </div>)
            }
            <MainModal isOpen={open} onClose={() => setOpen(false)}>
                <div className="w-full p-6 text-white rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Invite Members</h2>

                    <div className="space-y-4 w-full">
                        {memberList.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center w-full justify-between bg-card_bg p-3 rounded-lg border border-gray-700"
                            >
                                <div className="flex items-center space-x-3">
                                    {/* Member Image */}
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-12 h-12 rounded-full border-2 border-gray-500"
                                    />
                                    {/* Member Name */}
                                    <p className="text-lg font-bold">{member.name}</p>
                                </div>
                                {/* Invite Button */}
                                <button className="bg-blue-500 px-4 py-2 rounded text-white">
                                    Invite
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </MainModal>
        </div>
    );
};

export default Roaster;