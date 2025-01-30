import logo from "@/assets/tournament/team-logo.png";
import ClanComponents from '../../../shared/ClanCard/ClanComponents';

const dummyTeams = [
  {
    teamName: "Team 1",
    teamLogo: logo,
    players: [
      {
        name: "Player A",
        discordId: "100",
        avatar: logo,
      },
      {
        name: "Player B1",
        discordId: "2001",
        avatar: logo,
      },
    ],
  },
  {
    teamName: "Team 2",
    teamLogo: logo,
    players: [
      {
        name: "Player A",
        discordId: "100",
        avatar: logo,
      },
      {
        name: "Player B2",
        discordId: "2002",
        avatar: logo,
      },
    ],
  },
];



const Clan = () => {
  return (
    <div>
      <ClanComponents teams={dummyTeams} />
    </div>
  );
};

export default Clan;