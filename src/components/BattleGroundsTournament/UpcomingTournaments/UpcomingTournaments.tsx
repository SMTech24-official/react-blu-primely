
import { Tournament } from "../../../redux/apis/tournament/TournamentApi";
import TournamentCard from "../../allCards/tournmentCommunity/TournmentsCommunity";
import NoDataAvailable from "../../shared/noData/NoDataAvailableTwo";
import OctagonCard from "../../shared/octagon/octagon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useState } from "react";


export default function UpcomingTournamentPage({ tournaments }: { tournaments: Tournament[] }) {
  const [selectedTeamSize, setSelectedTeamSize] = useState<string>("all");
  const [selectedCategories, setSelectedCategories] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<string>("all");




  // Function to filter tournaments based on the selected filters
  const filteredTournaments = tournaments.filter((tournament) => {
    const teamSizeMatch =
      selectedTeamSize === "all" ||
      tournament.teamSize === parseInt(selectedTeamSize);
    const categoriesMatch = selectedCategories === "all";
    const platformMatch =
      selectedPlatform === "all" ||
      tournament.gamePlatform?.toLowerCase() === selectedPlatform.toLowerCase();
    const skillMatch =
      selectedSkill === "all" ||
      tournament.skillLevel.toLowerCase() === selectedSkill.toLowerCase();
    return teamSizeMatch && categoriesMatch && platformMatch && skillMatch;
  });

  return (
    <div className="container section-gap">
      <div className="space-y-20">
        <div className="hidden grid-cols-1 md:grid-cols-4 gap-4 mb-8 ">
          <Select value={selectedTeamSize} onValueChange={setSelectedTeamSize}>
            <SelectTrigger className="w-full bg-transparent border-gray-800">
              <SelectValue placeholder="Categoriess" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Team Size</SelectItem>
              <SelectItem value="PUBG">PUBG</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedCategories}
            onValueChange={setSelectedCategories}
          >
            <SelectTrigger className="w-full bg-transparent border-gray-800">
              <SelectValue placeholder="Categoriess" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Categoriess</SelectItem>
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
              <SelectItem value="LeagueOfLegends">League of Legends</SelectItem>
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

          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Upcoming Tournaments
        </h1>

        {filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTournaments
              .slice(0, 4)
              .map((tournament: Tournament, idx: number) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-2 -top-20 xl:-left-5 xl:-top-5 z-20">
                    <OctagonCard
                      prize={tournament.prizePool}
                      description={"Wining Prize"}
                    />
                  </div>
                  <TournamentCard
                    id={tournament.id}
                    // enrollmentStatus={tournament?.maxTeams === tournament?.participants.length}
                    // registrationStatus={tournament?.startDate ? new Date(tournament.startDate) > new Date() : false}
                    imageSrc={tournament.image}
                    title={tournament.title}
                    prize={tournament.prizePool}
                    description={tournament.description}
                    date={tournament.startDate}
                    entryFee={tournament.entryFee}
                    teamSize={tournament.teamSize}
                    regions={tournament.region}
                    skillLevel={tournament.skillLevel}
                  />
                </div>
              ))}
          </div>
        ) : (
          <NoDataAvailable text="No tournaments available right now" />
        )}
      </div>
    </div>
  );
}
