import { Dispatch, SetStateAction } from "react";

export type NavPropsTypes = {
  name: string;
  link: string;
};

export interface TournamentProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  prize?: number;
  maxTeams?: number;
  enrolledTeams?: number;
  description?: string;
  date: string;
  entryFee: string;
  teamSize: string;
  regions: string;
  game?: string;
  skillLevel: string;
  platform?: string;
  badge?: boolean;
  registrationStatus: boolean;
  enrollmentStatus: boolean;
  tournamentType?: string;
}

export interface PrimalChampionshipCardProps {
  title: string;
  image: string;
  prize?: number;
  description?: string;
  subtitle?: string;
  battleground: string;
  teamSize: string;
  maxTeams: number;
  enrolled: number;
  startingTime: string;
  thumbnailUrl: string;
  onView?: () => void;
  registrationStatus: boolean;
  enrollmentStatus: boolean;
  entryFee: string;
  regions: string;
  date: string;
  skillLevel: string;
  game: string;
  platform: string;
  enrolledTeams: number;
}

export interface TournamentDetails {
  entryFee: number;
  format: string;
  battleground: string;
  regions: string[];
  entryCredits: number;
  teamSize: string;
  maxTeams: number;
  enrolled: number;
  registrationStatus: string;
  startingTime: string;
  imageUrl: string;
}

export interface TournamentBannerProps {
  bannerImage: string;
  title: string;
  subtitle: string;
  gameName: string;
  tournamentType: string;
  platform: string;
  startDate: string;
  registrationStatus: boolean;
  enrollmentStatus: boolean;
  entryFee: string | number;
  teamSize: string;
  maxTeams: number;
  enrolledTeams: number;
  skillLevel: string;
  setShowConfetti: Dispatch<SetStateAction<boolean>>;
}

export interface Player {
  name: string;
  discordId: string;
  avatar: string;
}

export interface ClanCardProps {
  teamName: string;
  teamLogo: string;
  players: Player[];
  onViewDetails?: () => void;
  onToggleRoster?: () => void;
  isRosterHidden?: boolean;
}
