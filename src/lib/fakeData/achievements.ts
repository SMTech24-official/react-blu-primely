export type AchievementType = {
  tournament: string;
  team: string;
  place: string;
  year: number;
};

const achievements: AchievementType[] = [
  {
    tournament: "Valorant Champions",
    team: "Sentinels",
    place: "1st",
    year: 2023,
  },
  {
    tournament: "CS:GO Major",
    team: "NAVI",
    place: "1st",
    year: 2022,
  },
  {
    tournament: "Dota 2 - The International",
    team: "Team Spirit",
    place: "1st",
    year: 2021,
  },
  {
    tournament: "League of Legends Worlds",
    team: "T1",
    place: "2nd",
    year: 2022,
  },
  {
    tournament: "Rocket League Championship",
    team: "Team BDS",
    place: "1st",
    year: 2022,
  },
  {
    tournament: "Overwatch League",
    team: "San Francisco Shock",
    place: "1st",
    year: 2023,
  },
  {
    tournament: "Rainbow Six Siege Invitational",
    team: "G2 Esports",
    place: "1st",
    year: 2021,
  },
];

export default achievements;
