import { useState } from "react";
import { useGetTournamentsQuery } from "../../../redux/apis/tournament/TournamentApi";
import TournamentCard from "../../allCards/tournmentCommunity/TournmentsCommunity";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";
import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import Loading from "../../others/Loading";





export default function TournamentPage() {

  const { data, isLoading } = useGetTournamentsQuery({
  });


  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string>("all");

  // Function to filter tournaments based on the selected filters


  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container section-gap">
      <div className="">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          COMMUNITY TOURNAMENT
        </h1>
        <p className="text-gray-400 mb-8">
          Bring multiple teams together in a bracket for single elimination
          mayhem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-full bg-transparent border-gray-800">
              <SelectValue placeholder="Games" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Games</SelectItem>
              <SelectItem value="PUBG">PUBG</SelectItem>
              <SelectItem value="Warzone">Warzone</SelectItem>
              <SelectItem value="ApexLegends">Apex Legends</SelectItem>
              <SelectItem value="Fortnite">Fortnite</SelectItem>
              <SelectItem value="Valorant">Valorant</SelectItem>
              <SelectItem value="CSGO">CS: GO</SelectItem>
              <SelectItem value="Overwatch">Overwatch</SelectItem>
              <SelectItem value="RainbowSix">Rainbow Six Siege</SelectItem>
              <SelectItem value="CallOfDuty">Call of Duty</SelectItem>
              <SelectItem value="GTA5">GTA V</SelectItem>
              <SelectItem value="Minecraft">Minecraft</SelectItem>
              <SelectItem value="Roblox">Roblox</SelectItem>
              <SelectItem value="LeagueOfLegends">
                League of Legends
              </SelectItem>
              <SelectItem value="Dota2">Dota 2</SelectItem>
              <SelectItem value="FIFA">FIFA</SelectItem>
              <SelectItem value="RocketLeague">Rocket League</SelectItem>
              <SelectItem value="FallGuys">Fall Guys</SelectItem>
              <SelectItem value="AmongUs">Among Us</SelectItem>
              <SelectItem value="Cyberpunk2077">Cyberpunk 2077</SelectItem>
              <SelectItem value="EldenRing">Elden Ring</SelectItem>
              <SelectItem value="TheWitcher3">The Witcher 3</SelectItem>
              <SelectItem value="Rust">Rust</SelectItem>
              <SelectItem value="Terraria">Terraria</SelectItem>
              <SelectItem value="GenshinImpact">Genshin Impact</SelectItem>
              <SelectItem value="Hades">Hades</SelectItem>
              <SelectItem value="Diablo4">Diablo 4</SelectItem>
              <SelectItem value="Starfield">Starfield</SelectItem>
              <SelectItem value="AssassinsCreed">
                Assassin&apos;s Creed
              </SelectItem>
              <SelectItem value="HogwartsLegacy">Hogwarts Legacy</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedPlatform}
            onValueChange={setSelectedPlatform}
          >
            <SelectTrigger className="w-full bg-transparent border-gray-800">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
              <SelectItem value="PC">PC</SelectItem>
            </SelectContent>
          </Select>

          {/* Skill Level Filter */}
          <Select value={selectedSkill} onValueChange={setSelectedSkill}>
            <SelectTrigger className="w-full bg-transparent border-gray-800">
              <SelectValue placeholder="Skill Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skill</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {data && data?.data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.data.slice(0, 4).map((tournament, idx) => (
              <TournamentCard
                game={tournament.gameName}
                badge={false}
                key={idx}
                imageSrc={tournament.image}
                prize={tournament.prizePool}
                description={tournament.description}
                title={tournament.title}
                date={tournament.startDate}
                entryFee={tournament.entryFee}
                teamSize={tournament.teamSize}
                regions={tournament.region}
                skillLevel={tournament.skillLevel}
              />
            ))}
          </div>
        ) : (
          <NoDataAvailable text="No tournaments available right now" />
        )}
      </div>
    </div>
  );
}

