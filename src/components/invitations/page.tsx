/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import {
  useGetUserInvitationsQuery,
  useUpdateInvitationMutation,
} from "../../redux/apis/invitation/InvitationApi";
import Loading from "../others/Loading";

const InvitationPage = () => {
  const {
    data: invitationsResponse,
    isLoading,
    refetch,
  } = useGetUserInvitationsQuery({
    page: 1,
    limit: 10,
  });

  const [updateInvitation] = useUpdateInvitationMutation();

  // Function to update the invitation status
  const handleStatusChange = async (
    invitationId: string,
    newStatus: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      const res = await updateInvitation({
        id: invitationId,
        status: newStatus,
      }).unwrap();
      refetch(); // Refresh the list after updating

      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Failed to update invitation:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const invitations = invitationsResponse?.data.invitations || [];

  return (
    <div className="container section-gap mx-auto p-6 text-white rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Invitations</h3>

      <div className="space-y-4">
        {invitations?.length > 0 ? (
          invitations?.map((invite: any) => (
            <div
              key={invite.id}
              className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between bg-card_bg p-3 rounded-lg"
            >
              {/* Sender Information */}
              <div className="flex items-center space-x-3">
                <img
                  src={
                    invite.inviter?.profilePicture ||
                    "https://img.freepik.com/free-photo/user-profile-interface-sign-symbol-icon-3d-rendering_56104-1956.jpg?ga=GA1.1.603131680.1747477038&semt=ais_hybrid&w=740"
                  }
                  alt={invite.inviter?.userName || "Inviter"}
                  className="w-12 h-12 rounded-full border-2 border-gray-500 aspect-square"
                />
                <div>
                  <p className="text-lg font-bold">
                    {invite.inviter?.userName || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-300">Sender</p>
                  {invite.inviter?.xp && invite.inviter?.level && (
                    <p className="text-sm text-gray-400">
                      XP: {invite.inviter.xp} | Level: {invite.inviter.level}
                    </p>
                  )}
                </div>
              </div>

              {/* Invitation Information */}
              <div className="flex items-center space-x-3">
                <div>
                  {invite.clan && (
                    <>
                      <p className="text-sm text-gray-300">
                        Clan: {invite.clan.name}
                      </p>
                      <p className="text-sm text-gray-300">
                        Mission: {invite.clan.mission}
                      </p>
                      <p className="text-sm text-gray-300">
                        Members: {invite.clan._count.ClanMember}
                      </p>
                    </>
                  )}
                  <p
                    className={`text-sm ${
                      invite.status === "PENDING"
                        ? "text-yellow-400"
                        : invite.status === "ACCEPTED"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {invite.status}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              {invite.status === "PENDING" && (
                <div className="flex space-x-2">
                  <button
                    className="bg-green-800 px-4 py-2 rounded text-white hover:bg-green-700 transition"
                    onClick={() => handleStatusChange(invite.id, "ACCEPTED")}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-800 px-4 py-2 rounded text-white hover:bg-red-700 transition"
                    onClick={() => handleStatusChange(invite.id, "REJECTED")}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No invitations found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationPage;
