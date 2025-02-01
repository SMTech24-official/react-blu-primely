export const tournaments: {
  title: string;
  prize: {
    totalPrize: number;
    firstPrize: number;
    secondPrize: number;
    thirdPrize: number;
  };
  gameName: string;
  entryFee: number;
  date: string;
  maxTeams: number;
}[] = [
  {
    title: "Battle Royale Championship",
    prize: {
      totalPrize: 5000,
      firstPrize: 2000,
      secondPrize: 1500,
      thirdPrize: 1000,
    },
    gameName: "Battle Royale",
    entryFee: 50,
    date: "2025-03-15",
    maxTeams: 20,
  },
  {
    title: "FPS Masters",
    prize: {
      totalPrize: 3000,
      firstPrize: 1200,
      secondPrize: 800,
      thirdPrize: 500,
    },
    gameName: "Call of Duty",
    entryFee: 30,
    date: "2025-04-10",
    maxTeams: 16,
  },
  {
    title: "MOBA Showdown",
    prize: {
      totalPrize: 4000,
      firstPrize: 1800,
      secondPrize: 1200,
      thirdPrize: 700,
    },
    gameName: "League of Legends",
    entryFee: 40,
    date: "2025-05-05",
    maxTeams: 24,
  },
];

// Dummy data array
export const players = [
  {
    name: "John Doe",
    tournaments: "League of Legends",
    type: "Professional",
    feePaid: 20,
  },
  {
    name: "Jane Smith",
    tournaments: "League of Legends",
    type: "Amateur",
    feePaid: 40,
  },
  {
    name: "Alex Johnson",
    tournaments: "League of Legends",
    type: "Professional",
    feePaid: 20,
  },
  {
    name: "Emily Brown",
    tournaments: "League of Legends",
    type: "Amateur",
    feePaid: 40,
  },
];
