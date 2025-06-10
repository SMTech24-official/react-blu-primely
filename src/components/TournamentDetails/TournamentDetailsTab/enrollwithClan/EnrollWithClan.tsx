/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import { useGetClansByUserQuery } from "../../../../redux/apis/clan/ClanApi";
import { useInitiatePaymentMutation } from "../../../../redux/apis/payment/PaymentApi";
import { useNavigate } from "react-router-dom";

interface ClanMember {
  role: string;
  user: {
    id: string;
    fullName: string | null;
    userName: string;
    email: string;
    role: string;
    profilePicture: string | null;
    coverPicture: string | null;
  };
}

interface ClanStats {
  id: string;
  clanId: string;
  totalMatches: number;
  wins: number;
  losses: number;
  winRate: number;
  exp: number;
  eliteTrophies: number;
  goldTrophies: number;
  silverTrophies: number;
  bronzeTrophies: number;
  totalEarnings: number;
  rank: number;
  totalScore: number;
  createdAt: string;
  updatedAt: string;
}

interface Clan {
  id: string;
  userId: string;
  name: string;
  mission: string;
  values: string;
  logo: string | null;
  chatId: string;
  createdAt: string;
  updatedAt: string;
  ClanMember: ClanMember[];
  ClanStats: ClanStats;
}

export interface ClanResponse {
  success: boolean;
  message: string;
  data: Clan[];
}

const EnrollWithClan = ({ tournamentId }: { tournamentId: string }) => {
  const { data, isLoading, error } = useGetClansByUserQuery() as {
    data: ClanResponse | undefined;
    isLoading: boolean;
    error: any;
  };

  const navigate = useNavigate();
  // Assuming the last part is the tournament ID
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  const [initiatePayment] = useInitiatePaymentMutation();
  const handleEnroll = async (clanId: string) => {
    console.log("Enrolling clan:", clanId, "in tournament:", tournamentId);
    try {
      const res = await initiatePayment({
        paymentData: {
          tournamentId: tournamentId as string,
          clanId: clanId,
        },
      });
      if ("data" in res && (res.data as any)?.success) {
        // Assuming the response contains a URL to redirect to
        toast.success("Enrollment successful! Redirecting to payment...");
        handleNavigate("/payment");
      } else {
        toast.error("Enrollment failed. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // Handle unexpected errors
    }
  };

  // Loading state - Compact for modal
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="relative mb-4">
          <div className="w-10 h-10 border-3 border-gray-700 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-10 h-10 border-3 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 text-sm animate-pulse">
          Loading your clans...
        </p>
      </div>
    );
  }

  // Error state - Compact for modal
  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-4 text-center">
          <div className="w-12 h-12 mx-auto mb-3 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-white font-semibold mb-2">
            Failed to Load Clans
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Unable to fetch clan data
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[70vh] overflow-hidden flex flex-col">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 pb-2 border-b border-gray-700/30">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl mb-3">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">
            Choose Your Clan
          </h2>
          <p className="text-gray-400 text-sm">
            Select a clan to enroll in the tournament
          </p>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {data?.data?.length ? (
          data.data.map((clan) => (
            <div
              key={clan.id}
              className="bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-purple-500/40 hover:bg-gray-800/60 transition-all duration-200 group cursor-pointer"
            >
              {/* Clan Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {clan.logo ? (
                    <img
                      src={clan.logo}
                      alt={clan.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-600 group-hover:border-purple-500/50 transition-colors flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">
                        {clan.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-semibold text-lg truncate group-hover:text-purple-300 transition-colors">
                      {clan.name}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">
                      {clan.mission}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold text-sm">
                      #{clan.ClanStats.rank}
                    </div>
                    <div className="text-gray-500 text-xs">Rank</div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gray-800/40 rounded-lg p-2 text-center">
                  <div className="text-green-400 font-semibold text-sm">
                    {clan.ClanStats.wins}
                  </div>
                  <div className="text-gray-500 text-xs">Wins</div>
                </div>
                <div className="bg-gray-800/40 rounded-lg p-2 text-center">
                  <div className="text-blue-400 font-semibold text-sm">
                    {clan.ClanStats.totalMatches}
                  </div>
                  <div className="text-gray-500 text-xs">Matches</div>
                </div>
                <div className="bg-gray-800/40 rounded-lg p-2 text-center">
                  <div className="text-purple-400 font-semibold text-sm">
                    {clan.ClanStats.winRate.toFixed(1)}%
                  </div>
                  <div className="text-gray-500 text-xs">Win Rate</div>
                </div>
              </div>

              {/* Members Preview */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm font-medium">
                    Members
                  </span>
                  <span className="text-gray-500 text-xs">
                    {clan.ClanMember.length} total
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {clan.ClanMember.slice(0, 5).map((member) => (
                    <div key={member.user.id} className="relative group/member">
                      {member.user.profilePicture ? (
                        <img
                          src={member.user.profilePicture}
                          alt={member.user.userName}
                          className="w-8 h-8 rounded-full border-2 border-gray-600 hover:border-purple-400 transition-colors"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full border-2 border-gray-600 hover:border-purple-400 transition-colors flex items-center justify-center">
                          <span className="text-xs text-white font-medium">
                            {member.user.userName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      {member.role === "LEADER" && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs">👑</span>
                        </div>
                      )}
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/member:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {member.user.userName}
                        {member.role === "LEADER" && " (Leader)"}
                      </div>
                    </div>
                  ))}
                  {clan.ClanMember.length > 5 && (
                    <div className="w-8 h-8 bg-gray-700 rounded-full border-2 border-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-300">
                        +{clan.ClanMember.length - 5}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Enroll Button */}
              <button
                onClick={() => handleEnroll(clan.id)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/25"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Enroll This Clan
                </span>
              </button>
            </div>
          ))
        ) : (
          // No clans state - Compact for modal
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-xl flex items-center justify-center border border-purple-500/20">
              <svg
                className="w-8 h-8 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">
              No Clans Available
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
              You need to create or join a clan before enrolling in tournaments
            </p>
            <div className="space-y-2">
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200">
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Clan
                </span>
              </button>
              <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200">
                Browse Clans
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.7);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(147, 51, 234, 0.5) rgba(55, 65, 81, 0.3);
        }
      `}</style>
    </div>
  );
};

export default EnrollWithClan;
