/* eslint-disable @typescript-eslint/no-explicit-any */
import apex from "@/assets/banner/apex-media-news-saviors-patch-keyart.jpg.adapt_.crop16x9.431p.jpg";
import cod from "@/assets/banner/BO6_LP-meta_image.jpg";
import csgo from "@/assets/banner/csgo.jpg";
import dota2 from "@/assets/banner/dota2.png";
import fifa from "@/assets/banner/fifa.jpg";
import fortnite from "@/assets/banner/fortnite-og-social-1920x1080-a5adda66fab9.jpg";
import freeFire from "@/assets/banner/garena-free-fire_734y.jpg";
import overwatch from "@/assets/banner/overwatch.jpg";
import pubg from "@/assets/banner/pubg-battlegrounds-9i69f.jpg";
import rainbowSix from "@/assets/banner/rainbow-six-seige.jpg";
import rocketLeague from "@/assets/banner/rocketleague.jpg";
import valorant from "@/assets/banner/valorent.jpg";

export const tournaments: any = [
  {
    status: "ACTIVE",
    imageSrc: freeFire,
    title: "1v1 KILL RACE BEST OF 1",
    subtitle: "Battle to the top in a fast-paced 1v1 showdown!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-01-14T09:00:00.000Z",
    entryFee: 200,
    teamSize: "1v1",
    regions: "NA + EU",
    skillLevel: "All",
    game: "freefire",
    platform: "mobile",
    maxTeams: 32,
    enrolledTeams: 10,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Community",
  },
  {
    status: "UPCOMING",
    imageSrc: pubg,
    title: "PUBG Mobile Solo Showdown",
    subtitle: "Prove yourself as the ultimate PUBG solo champion!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-01-20T16:00:00.000Z",
    entryFee: 200,
    teamSize: "Solo",
    regions: "Global",
    skillLevel: "Intermediate",
    game: "pubg",
    platform: "mobile",
    maxTeams: 50,
    enrolledTeams: 30,
    enrollmentStatus: false,
    registrationStatus: false,
    tournamentType: "Primely Championship",
  },
  {
    status: "CANCEL",
    imageSrc: apex,
    title: "Apex 3v3 Arena Battle",
    subtitle:
      "Form your squad and fight for victory in this intense 3v3 battle!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-01-25T18:30:00.000Z",
    entryFee: 200,
    teamSize: "3v3",
    regions: "EU + Asia",
    skillLevel: "Advanced",
    game: "apexlegends",
    platform: "pc",
    maxTeams: 20,
    enrolledTeams: 15,
    enrollmentStatus: true,
    registrationStatus: true,
    tournamentType: "Community",
  },
  {
    status: "ACTIVE",
    imageSrc: valorant,
    title: "Valorant 5v5 Clash",
    subtitle: "Team up for tactical combat in Valorant's 5v5 faceoff!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-01-30T08:00:00.000Z",
    entryFee: 200,
    teamSize: 5,
    regions: "NA + SA",
    skillLevel: "Expert",
    game: "valorant",
    platform: "pc",
    maxTeams: 16,
    enrolledTeams: 8,
    enrollmentStatus: true,
    registrationStatus: false,
    tournamentType: "Primely Championship",
  },
  {
    status: "CANCEL",
    imageSrc: fortnite,
    title: "Fortnite Build Battle",
    subtitle:
      "Build and battle to claim victory in Fortnite's ultimate showdown!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-02-04T17:00:00.000Z",
    entryFee: 200,
    teamSize: "Duo",
    regions: "Global",
    skillLevel: "All",
    game: "fortnite",
    platform: "pc",
    maxTeams: 50,
    enrolledTeams: 20,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Community",
  },
  {
    status: "UPCOMING",
    imageSrc: cod,
    title: "COD Mobile Kill Race",
    subtitle:
      "Fast-paced action and intense gunplay in COD Mobile's Kill Race!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-02-10T12:00:00.000Z",
    entryFee: 200,
    teamSize: "1v1",
    regions: "Asia",
    skillLevel: "Intermediate",
    game: "codmobile",
    platform: "mobile",
    maxTeams: 40,
    enrolledTeams: 15,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Primely Championship",
  },
  {
    status: "ACTIVE",
    imageSrc: overwatch,
    title: "Overwatch 2 Control Map Battle",
    subtitle: "Master the Control Map and claim victory in Overwatch 2!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-02-15T15:00:00.000Z",
    entryFee: 200,
    teamSize: "6v6",
    regions: "NA + EU",
    skillLevel: "Expert",
    game: "overwatch",
    platform: "pc",
    maxTeams: 10,
    enrolledTeams: 5,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Community",
  },
  {
    status: "CANCEL",
    imageSrc: csgo,
    title: "CS:GO Team Deathmatch",
    subtitle: "Fight for dominance in CS:GO's intense team deathmatch!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-02-20T20:00:00.000Z",
    entryFee: 200,
    teamSize: 5,
    regions: "Global",
    skillLevel: "Advanced",
    game: "csgo",
    platform: "pc",
    maxTeams: 24,
    enrolledTeams: 12,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Primely Championship",
  },
  {
    status: "ACTIVE",
    imageSrc: rainbowSix,
    title: "Rainbow Six Siege Showdown",
    subtitle: "Tactical gameplay meets intense combat in Rainbow Six Siege!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-02-25T09:00:00.000Z",
    entryFee: 200,
    teamSize: 5,
    regions: "EU + NA",
    skillLevel: "Intermediate",
    game: "rainbowsix",
    platform: "pc",
    maxTeams: 16,
    enrolledTeams: 10,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Community",
  },
  {
    status: "ACTIVE",
    imageSrc: fifa,
    title: "FIFA 23 Online Cup",
    subtitle: "Compete in FIFA 23's ultimate online cup for glory!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-03-01T11:00:00.000Z",
    entryFee: 200,
    teamSize: "1v1",
    regions: "Global",
    skillLevel: "All",
    game: "fifa",
    platform: "console",
    maxTeams: 32,
    enrolledTeams: 20,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Primely Championship",
  },
  {
    status: "ACTIVE",
    imageSrc: rocketLeague,
    title: "Rocket League Duo Faceoff",
    subtitle: "Show off your skills in Rocket League's exciting duo showdown!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-03-05T18:00:00.000Z",
    entryFee: 200,
    teamSize: "2v2",
    regions: "NA + EU",
    skillLevel: "Intermediate",
    game: "rocketleague",
    platform: "pc",
    maxTeams: 16,
    enrolledTeams: 8,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Community",
  },
  {
    status: "ACTIVE",
    imageSrc: fortnite,
    title: "Fortnite Zero Build Blitz",
    subtitle:
      "Battle in Fortnite without the build mechanic for a true test of skill!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-03-10T12:00:00.000Z",
    entryFee: 200,
    teamSize: "4v4",
    regions: "Asia",
    skillLevel: "Advanced",
    game: "fortnite",
    platform: "pc",
    maxTeams: 30,
    enrolledTeams: 18,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Primely Championship",
  },
  {
    status: "ACTIVE",
    imageSrc: pubg,
    title: "PUBG Mobile Squad Showdown",
    subtitle: "Team up for the ultimate PUBG Mobile squad showdown!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-03-15T16:00:00.000Z",
    entryFee: 200,
    teamSize: "4v4",
    regions: "Asia + Oceania",
    skillLevel: "All",
    game: "pubgmobile",
    platform: "mobile",
    maxTeams: 40,
    enrolledTeams: 22,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Community",
  },
  {
    status: "ACTIVE",
    imageSrc: apex,
    title: "Apex Legends Last Team Standing",
    subtitle: "Fight till the last team stands victorious in Apex Legends!",
    prize: {
      totalPrize: 1000,
      firstPrize: 100,
      secondPrize: 23,
      thirdPrize: 34,
    },
    description: "Wining prize",
    date: "2025-03-20T14:00:00.000Z",
    entryFee: 200,
    teamSize: "3v3",
    regions: "Global",
    skillLevel: "Expert",
    game: "apex",
    platform: "pc",
    maxTeams: 24,
    enrolledTeams: 12,
    enrollmentStatus: false,
    registrationStatus: true,
    tournamentType: "Primely Championship",
  },
  {
    status: "ACTIVE",
    imageSrc: dota2,
    title: "Dota 2 All-Star Battle",
    subtitle: "Battle with the best in Dota 2's All-Star showdown!",
    prize: 1000,
    description: "Wining prize",
    date: "2025-03-25T10:00:00.000Z",
    entryFee: 200,
    teamSize: 5,
    regions: "NA + EU",
    skillLevel: "Advanced",
    game: "dota2",
    platform: "pc",
    maxTeams: 16,
    enrolledTeams: 10,
    tournamentType: "Community",
  },
];
