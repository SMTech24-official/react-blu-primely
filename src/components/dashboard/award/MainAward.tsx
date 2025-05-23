import { useGetClansQuery } from '../../../redux/apis/clan/ClanApi';
import { Loader } from 'lucide-react';
import { AwardTable } from './Table';
import { TAward } from '../../../redux/types';

// Define the exact interface expected by AwardTable
interface ApiClan {
  id: string;
  name: string;
  tournamentsPlayed: number;
  trophies: {
    type: "Bronze" | "Silver" | "Gold" | "Elite";
    count: number;
  }[];
  lostWin: {
    lost: number;
    win: number;
  };
  ClanMember: {
    id: string;
    name: string;
  }[];
  ClanStats: {
    clanId: string;
    totalMatches: number;
    wins: number;
    losses: number;
    bronzeTrophies: number;
    silverTrophies: number;
    goldTrophies: number;
    eliteTrophies: number;
  };
  awards: TAward[]; 
}

const MainAward = () => {
  const { data, isLoading, error, refetch } = useGetClansQuery();
  console.log(data, 'data');

    if (isLoading) return <div className="flex justify-center p-8"><Loader className="animate-spin" /></div>;
    if (error) return <div className="p-4 text-red-500">Error loading clan data</div>;

    // Transform API data to match ApiClan interface
  const clans: ApiClan[] = data?.data?.map(apiClan => {
      console.log(apiClan.Award, 'aapi');
      // Ensure ClanStats has all required properties including clanId
      const clanStats = apiClan.ClanStats ? {
        clanId: apiClan.ClanStats.clanId || apiClan.id,
        totalMatches: apiClan.ClanStats.totalMatches,
        wins: apiClan.ClanStats.wins,
        losses: apiClan.ClanStats.losses,
        bronzeTrophies: apiClan.ClanStats.bronzeTrophies,
        silverTrophies: apiClan.ClanStats.silverTrophies,
        goldTrophies: apiClan.ClanStats.goldTrophies,
        eliteTrophies: apiClan.ClanStats.eliteTrophies
      } : {
        clanId: apiClan.id,
        totalMatches: 0,
        wins: 0,
        losses: 0,
        bronzeTrophies: 0,
        silverTrophies: 0,
        goldTrophies: 0,
        eliteTrophies: 0
      };

      return {
        id: apiClan.id,
        name: apiClan.name,
        tournamentsPlayed: clanStats.totalMatches,
        trophies: [
          { type: "Bronze", count: clanStats.bronzeTrophies },
          { type: "Silver", count: clanStats.silverTrophies },
          { type: "Gold", count: clanStats.goldTrophies },
          { type: "Elite", count: clanStats.eliteTrophies }
        ],
        lostWin: {
          lost: clanStats.losses,
          win: clanStats.wins
        },
        ClanMember: (apiClan.ClanMember || []).map(member => ({
          id: member.user.id,
          name: member.user.fullName || member.user.userName || 'Unknown'
        })),
        ClanStats: clanStats,
        awards: apiClan.Award
      };
    }) || [];

    return (
        <div className="p-4">
        <AwardTable clans={clans} refetch={refetch} />
        </div>
    );
};

export default MainAward;