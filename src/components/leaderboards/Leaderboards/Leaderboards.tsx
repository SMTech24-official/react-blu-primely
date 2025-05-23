/* eslint-disable @typescript-eslint/no-explicit-any */
import banner from "@/assets/leaderboard/leaderboard-banner.png";
import { useGetClanLeaderQuery, useGetUserLeaderQuery } from "../../../redux/apis/leaderboard/leaderBoard";
import { LeaderboardTable } from "../../dashboard/dashboard/leaderBoard/Table";
import Loading from "../../others/Loading";
import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const Leaderboards = () => {


  const { data: User, isLoading } = useGetUserLeaderQuery({});
  const { data: Clan, isLoading: clanLoading } = useGetClanLeaderQuery({});

  if (clanLoading || isLoading) {
    return <Loading />;
  }


  return (
    <div className="relative bg-[#151515]">
      {/* Banner Section */}
      <div className="relative">
        {/* Background image */}
        <img
          src={banner}
          alt="Leaderboards Banner"
          width={1200}
          height={1200}
          className="object-cover w-full h-[300px] sm:h-[500px]"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Title and Description */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-2xl lg:text-5xl font-bold text-white mb-4">
            LEADERBOARD
          </h1>
          <p className="text-zinc-300 mb-8 text-sm lg:text-base font-normal">
            View the weekly, monthly, and all-time rankings for XP, earnings,
            and trophies.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="">
        <Tabs defaultValue="solo" className="rounded-lg shadow-md">
          {/* Tabs List */}
          <TabsList className="relative w-96 lg:w-[550px] -mt-20 lg:-mt-48 mx-auto bg-[#1d1d1d] h-14 rounded-xl px-3 flex justify-center mb-6">
            <TabsTrigger
              value="solo"
              className="h-10 w-72 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-full"
            >
              SOLO
            </TabsTrigger>
            <TabsTrigger
              value="clan"
              className="h-10 w-72 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-full"
            >
              CLAN
            </TabsTrigger>
          </TabsList>

          <div className="container">
            {/* Dropdown Filters */}
            <div className=" flex justify-center gap-2 lg:gap-4 mt-16 lg:mt-56 mb-10">
              {/* First Select */}
              <Select>
                <SelectTrigger className="w-full bg-[#1D1D1D] text-white px-4 py-2 rounded-lg">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xp">XP</SelectItem>
                  <SelectItem value="earnings">Earnings</SelectItem>
                  <SelectItem value="elite-trophy">
                    Elite Trophy Count
                  </SelectItem>
                  <SelectItem value="gold-trophy">Gold Trophy Count</SelectItem>
                </SelectContent>
              </Select>

              {/* Second Select */}
              <Select>
                <SelectTrigger className="w-full bg-[#1D1D1D] text-white px-4 py-2 rounded-lg">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-platforms">All Platforms</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="pc">PC</SelectItem>
                  <SelectItem value="cross-platform">Cross Platform</SelectItem>
                </SelectContent>
              </Select>

              {/* Third Select */}
              <Select>
                <SelectTrigger className="w-full bg-[#1D1D1D] text-white px-4 py-2 rounded-lg">
                  <SelectValue placeholder="Game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-games">All Games</SelectItem>
                  <SelectItem value="bo6">BO6</SelectItem>
                  <SelectItem value="blackops-zombies">
                    Blackops6Zombies
                  </SelectItem>
                  <SelectItem value="warzone">Warzone</SelectItem>
                  <SelectItem value="fortnite">Fortnite</SelectItem>
                  <SelectItem value="mw3">MW3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabs Content */}
            <TabsContent value="solo">
              <div className=" bg-[#1d1d1d] p-6 rounded-lg shadow-md">
                <LeaderboardTable members={User?.data as any} />
              </div>
            </TabsContent>
            <TabsContent value="clan">
              <div className="bg-[#1d1d1d] p-6 rounded-lg shadow-md">
                <LeaderboardTable members={Clan?.data as any} />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboards;
