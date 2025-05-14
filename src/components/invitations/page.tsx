import { useState } from "react";
import { useGetUserInvitationsQuery } from "../../redux/apis/invitation/InvitationApi";

// Define Invitation and User interfaces with clan details
interface Invitation {
    id: number;
    status: "Pending" | "Accepted" | "Declined";
    clanName: {
        name: string;
        members: number; // Number of members in the clan
    };
    user: {
        name: string;
        image: string;
        xp: number;
        level: number;
    };
}

const initialInvitations: Invitation[] = [
    {
        id: 1,
        status: "Pending",
        clanName: {
            name: "The Warriors",
            members: 50,
        },
        user: {
            name: "John Doe",
            image: "https://randomuser.me/api/portraits/men/10.jpg",
            xp: 3500,
            level: 15,
        },
    },
    {
        id: 2,
        status: "Pending",
        clanName: {
            name: "The Guardians",
            members: 42,
        },
        user: {
            name: "Jane Smith",
            image: "https://randomuser.me/api/portraits/women/11.jpg",
            xp: 2800,
            level: 12,
        },
    },
    {
        id: 3,
        status: "Pending",
        clanName: {
            name: "The Knights",
            members: 62,
        },
        user: {
            name: "Mark Brown",
            image: "https://randomuser.me/api/portraits/men/12.jpg",
            xp: 4200,
            level: 18,
        },
    },
];

const InvitationPage = () => {
    const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);
  const { data: invitationsResponse } = useGetUserInvitationsQuery({
    page: 1,
    limit: 10,
  });
console.log(invitationsResponse)
    // Function to update the invitation status
    const handleStatusChange = (id: number, newStatus: "Accepted" | "Declined") => {
        setInvitations((prevInvitations) =>
            prevInvitations.map((invite) =>
                invite.id === id ? { ...invite, status: newStatus } : invite
            )
        );
    };

    return (
        <div className="container section-gap mx-auto p-6 text-white rounded-lg">
            {/* Invitations */}
            <h3 className="text-2xl font-bold mb-4">Invitations</h3>

            <div className="space-y-4">
                {invitations.map((invite) => (
                    <div
                        key={invite.id}
                        className="flex flex-col sm:flex-row gap-3  sm:items-center justify-between bg-card_bg p-3 rounded-lg "
                    >
                        {/* Sender Information */}
                        <div className="flex items-center space-x-3">
                            <img
                                src={invite.user.image}
                                alt={invite.user.name}
                                className="w-12 h-12 rounded-full border-2 border-gray-500"
                            />
                            <div>
                                <p className="text-lg font-bold">{invite.user.name}</p>
                                <p className="text-sm text-gray-300">Sender</p>
                                <p className="text-sm text-gray-400">XP: {invite.user.xp} | Level: {invite.user.level}</p>
                            </div>
                        </div>

                        {/* Invitation Information */}
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="text-sm text-gray-300">Clan: {invite.clanName.name}</p>
                                <p className="text-sm text-gray-300">Members: {invite.clanName.members}</p>
                                <p
                                    className={`text-sm ${invite.status === "Pending"
                                        ? "text-yellow-400"
                                        : invite.status === "Accepted"
                                            ? "text-green-400"
                                            : "text-red-400"
                                        }`}
                                >
                                    {invite.status}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        {invite.status === "Pending" && (
                            <div className="flex space-x-2">
                                <button
                                    className="bg-green-800 px-4 py-2 rounded text-white"
                                    onClick={() => handleStatusChange(invite.id, "Accepted")}
                                >
                                    Accept
                                </button>
                                <button
                                    className="bg-red-800 px-4 py-2 rounded text-white"
                                    onClick={() => handleStatusChange(invite.id, "Declined")}
                                >
                                    Decline
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvitationPage;
