/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateInvitationMutation } from "../../redux/apis/invitation/InvitationApi";
import { useGetUsersQuery } from "../../redux/apis/user/userApi";
import { ClanMember } from "../../redux/types";
import { MainModal } from "../Modal/MainModal";
import Loading from "../others/Loading";
import PrimaryButton from "../shared/primaryButton";

const Roaster = ({ players }: { players: ClanMember[] }) => {
  const path = useParams();

  const [search, setSearch] = useState("");

  const [invite] = useCreateInvitationMutation();

  // const {data} = useIsInvitedQuery()

  const { data: membersResponse, isLoading } = useGetUsersQuery({
    searchTerm: search,
    page: 1,
    limit: 5,
  });
  const [open, setOpen] = useState(false);

  const handleInvite = async (userId: string) => {
    const inviteData = {
      userId: userId,
      clanId: path.id as string,
    };
    const res = await invite(inviteData);

    if (res?.data?.success) {
      toast.success("Invitation sent successfully");
      setOpen(false);
    } else {
      toast.error("Already Sent Invitation");
    }
    // Here you would typically call an API to send the invitation
    // For example: inviteUserToClan({ clanId, userId });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <PrimaryButton parent="my-2">
        <button onClick={() => setOpen(true)} className="flex items-center">
          <span>Invite</span> <Plus className="w-4 h-4" />
        </button>
      </PrimaryButton>

      {/* Current clan members */}
      {players?.map((player, idx) => (
        <div
          key={idx}
          className="flex bg-[#1D1D1D] items-center justify-between p-4 md:p-8 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <img
              src={
                player.user.profilePicture ||
                "https://img.freepik.com/free-photo/user-profile-interface-sign-symbol-icon-3d-rendering_56104-1956.jpg?ga=GA1.1.603131680.1747477038&semt=ais_hybrid&w=740"
              }
              alt={`${player.user.userName} logo`}
              width={40}
              height={40}
              className="rounded-full aspect-square"
            />
            <h3 className="text-lg font-semibold">{player.user.userName}</h3>
          </div>
          <p>{player.user.id}</p>
        </div>
      ))}

      {/* Invite modal */}
      <MainModal isOpen={open} onClose={() => setOpen(false)}>
        <div className="w-full p-6 text-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Invite Members</h2>
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-transparent text-white border border-gray-200"
          />
          <div className="space-y-4 w-full">
            {(membersResponse?.data?.length as any) > 0 ? (
              membersResponse?.data.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center w-full justify-between bg-card_bg p-3 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        user.profilePicture ||
                        "https://img.freepik.com/free-photo/user-profile-interface-sign-symbol-icon-3d-rendering_56104-1956.jpg?ga=GA1.1.603131680.1747477038&semt=ais_hybrid&w=740"
                      }
                      alt={user.userName}
                      className="w-12 h-12 rounded-full border-2 border-gray-500 aspect-square"
                    />
                    <div>
                      <p className="text-lg font-bold">{user.userName}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInvite(user.id)}
                    className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition"
                  >
                    Invite
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No members found</p>
            )}
          </div>
        </div>
      </MainModal>
    </div>
  );
};

export default Roaster;
