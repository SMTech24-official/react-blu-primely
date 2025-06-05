import React, { useState } from "react";
import { RoundColumnProps } from "../types/tournament";
import MatchCard from "./MatchCard";

const RoundColumn: React.FC<RoundColumnProps> = ({
  round,
  matches,
  onMatchClick,
}) => {
  const [hoveredMatchId, setHoveredMatchId] = useState<string | null>(null);

  const handleMouseEnter = (matchId: string) => {
    setHoveredMatchId(matchId);
  };

  const handleMouseLeave = () => {
    setHoveredMatchId(null);
  };

  const getRoundColor = (round: string): string => {
    switch (round) {
      case "Final":
        return "bg-gradient-to-r from-amber-700 to-amber-600";
      case "Semifinal":
        return "bg-gradient-to-r from-blue-700 to-blue-600";
      case "Quarterfinal":
        return "bg-gradient-to-r from-teal-700 to-teal-600";
      case "Round of 16":
        return "bg-gradient-to-r from-indigo-700 to-indigo-600";
      case "Round of 32":
        return "bg-gradient-to-r from-gray-700 to-gray-600";
      default:
        return "bg-gray-700";
    }
  };

  const getMatchContainerHeight = (
    round: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _totalMatches: number
  ): string => {
    if (round === "Final") return "h-full";
    if (round === "Semifinal") return "h-full gap-24";
    if (round === "Quarterfinal") return "h-full gap-16";
    return "h-full gap-8";
  };

  const getRoundDisplayName = (round: string): string => {
    switch (round) {
      case "Round of 16":
        return "Round of 16";
      case "Quarterfinal":
        return "Quarter-Finals";
      case "Semifinal":
        return "Semi-Finals";
      case "Final":
        return "Final";
      default:
        return round;
    }
  };

  return (
    <div className="flex flex-col min-w-[260px]">
      <div
        className={`${getRoundColor(
          round
        )} text-white text-center py-2 px-4 rounded-t-lg font-bold shadow-lg border-b border-gray-600`}
      >
        {getRoundDisplayName(round)}
      </div>

      <div
        className={`flex flex-col ${getMatchContainerHeight(
          round,
          matches.length
        )} justify-around py-4 bg-gray-800 rounded-b-lg shadow-lg border border-gray-700`}
      >
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            isHovered={hoveredMatchId === match.id}
            onMouseEnter={() => handleMouseEnter(match.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onMatchClick(match)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoundColumn;
