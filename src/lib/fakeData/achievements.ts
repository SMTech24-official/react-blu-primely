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

export const MatchData = [
  {
    tournamentName: "Championship League",
    gameMode: "Solo",
    dateTime: "2025-01-31 14:00",
    opponent: "Team A",
    status: "Upcoming",
  },
  {
    tournamentName: "Global Cup",
    gameMode: "Duo",
    dateTime: "2025-02-05 16:00",
    opponent: "Team B",
    status: "Scheduled",
  },
  {
    tournamentName: "Battle Royale Finals",
    gameMode: "Squad",
    dateTime: "2025-02-10 18:30",
    opponent: "Team C",
    status: "Ongoing",
  },
  {
    tournamentName: "Winter Clash",
    gameMode: "Solo",
    dateTime: "2025-02-15 20:00",
    opponent: "Team D",
    status: "Completed",
  },
];

export const RecentMatch = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJpGKY3KMEubEtolLQ40bh8kfteUu_cv8NA&s",
    opponent: "Team Alpha",
    date: "2025-01-31T14:00:00Z",
    result: "Win",
    scoreline: "3-1",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJpGKY3KMEubEtolLQ40bh8kfteUu_cv8NA&s",
    opponent: "Team Bravo",
    date: "2025-02-05T16:30:00Z",
    result: "Loss",
    scoreline: "2-3",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJpGKY3KMEubEtolLQ40bh8kfteUu_cv8NA&s",
    opponent: "Team Charlie",
    date: "2025-02-10T18:45:00Z",
    result: "Draw",
    scoreline: "1-1",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJpGKY3KMEubEtolLQ40bh8kfteUu_cv8NA&s",
    opponent: "Team Delta",
    date: "2025-02-15T20:00:00Z",
    result: "Win",
    scoreline: "4-0",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJpGKY3KMEubEtolLQ40bh8kfteUu_cv8NA&s",
    opponent: "Team Echo",
    date: "2025-02-20T15:30:00Z",
    result: "Win",
    scoreline: "2-0",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzJpGKY3KMEubEtolLQ40bh8kfteUu_cv8NA&s",
    opponent: "Team Foxtrot",
    date: "2025-02-25T19:00:00Z",
    result: "Loss",
    scoreline: "1-2",
  },
];
