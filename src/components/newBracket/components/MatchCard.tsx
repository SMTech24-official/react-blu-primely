import React from "react";
import { MatchCardProps } from "../types/tournament";
import TeamDisplay from "./TeamDisplay";
import { formatDate } from "../utils/dateUtils";
import { ChevronRight } from "lucide-react";

const MatchCard: React.FC<MatchCardProps> = ({
  match,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const isCompleted = match.status === "completed";

  const isTeam1Winner = match?.winnerId === match?.team1Id;
  const isTeam2Winner = match?.winnerId === match?.team2Id;

  console.log(match.status);
  console.log("status", isCompleted);
  console.log("Team 1", isTeam1Winner);
  console.log("Team 2", isTeam2Winner);

  return (
    <div
      id={`match-${match.id}`}
      className={`mx-2 my-1 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
        isHovered
          ? "shadow-lg scale-105 border-blue-500 bg-gray-700"
          : "shadow border-gray-600 bg-gray-800 hover:border-blue-400"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <TeamDisplay
          team={match.team1}
          isWinner={isCompleted && isTeam1Winner}
        />

        <div className="flex items-center my-2">
          <div className="h-px bg-gray-600 flex-grow"></div>
          <span className="px-2 text-xs text-gray-400">vs</span>
          <div className="h-px bg-gray-600 flex-grow"></div>
        </div>

        <TeamDisplay
          team={match.team2}
          isWinner={isCompleted && isTeam2Winner}
        />
      </div>

      <div className="mt-3 pt-2 border-t border-gray-600 flex justify-between items-center text-xs text-gray-400">
        <div>{formatDate(match.startTime)}</div>
        <div className="flex items-center">
          <span
            className={`
            ${
              isCompleted
                ? "bg-green-900 text-green-200"
                : "bg-blue-900 text-blue-200"
            } 
            px-2 py-0.5 rounded-full text-xs font-medium
          `}
          >
            {isCompleted ? "Completed" : "Upcoming"}
          </span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
