import React from "react";
import { MatchDetailsProps } from "../types/tournament";
import { formatDate, formatTime } from "../utils/dateUtils";
import { X, Calendar, Clock, Trophy, Mail } from "lucide-react";

const MatchDetails: React.FC<MatchDetailsProps> = ({
  match,
  onClose,
  handleWinner,
  winnerState,
  setWinner,
}) => {
  if (!match) return null;

  const isCompleted = match.status === "completed";
  
  const isTeam1Winner = match.team1Id
    ? match.winnerId === match.team1Id
    : false;
  const isTeam2Winner = match.team2Id
    ? match.winnerId === match.team2Id
    : false;

  const winner = isTeam1Winner
    ? match.team1
    : isTeam2Winner
    ? match.team2
    : null;

  // Check if winnerState matches team IDs
  const isTeam1Selected = winnerState === match.team1Id;
  const isTeam2Selected = winnerState === match.team2Id;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h3 className="text-lg font-bold">{match.round} Match Details</h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 p-1 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Match time and status */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(match.startTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{formatTime(match.startTime)}</span>
            </div>
          </div>

          {/* Status tag */}
          <div className="mb-6 flex justify-center">
            <span
              className={`
              inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
              ${
                isCompleted
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }
            `}
            >
              {isCompleted ? "Match Completed" : "Upcoming Match"}
            </span>
          </div>

          {/* Team 1 */}
          <div
            className={`
            p-4 rounded-lg mb-4 border-2 transition-all cursor-pointer
            ${
              isTeam1Winner
                ? "border-amber-300 bg-amber-50"
                : isTeam1Selected
                ? "border-blue-400 bg-blue-50 shadow-md ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }
          `}
            onClick={() => setWinner(match.team1Id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                flex items-center justify-center w-12 h-12 rounded-full 
                ${
                  isTeam1Winner
                    ? "bg-amber-100 text-amber-700"
                    : isTeam1Selected
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }
              `}
              >
                {match.team1?.image ? (
                  <img
                    src={match.team1?.image}
                    alt={match.team1?.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-xl font-bold">
                    {match.team1.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h4
                  className={`font-bold ${
                    isTeam1Selected ? "text-blue-800" : "text-gray-800"
                  }`}
                >
                  {match.team1?.name}
                </h4>
                <p className="text-sm text-gray-600">{match.team1?.fullName}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Mail className="h-3 w-3" />
                  <span>{match.team1?.email}</span>
                </div>
              </div>
              {isTeam1Winner && (
                <div className="ml-auto text-amber-600">
                  <Trophy className="h-6 w-6" />
                </div>
              )}
              {isTeam1Selected && !isTeam1Winner && (
                <div className="ml-auto text-blue-600">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              )}
            </div>
          </div>

          {/* Team 2 */}
          <div
            className={`
            p-4 rounded-lg mb-6 border-2 transition-all cursor-pointer
            ${
              isTeam2Winner
                ? "border-amber-300 bg-amber-50"
                : isTeam2Selected
                ? "border-blue-400 bg-blue-50 shadow-md ring-2 ring-blue-200"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }
          `}
            onClick={() => setWinner(match.team2Id)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`
                flex items-center justify-center w-12 h-12 rounded-full 
                ${
                  isTeam2Winner
                    ? "bg-amber-100 text-amber-700"
                    : isTeam2Selected
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }
              `}
              >
                {match.team2?.image ? (
                  <img
                    src={match.team2?.image}
                    alt={match.team2?.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-xl font-bold">
                    {match.team2?.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <h4
                  className={`font-bold ${
                    isTeam2Selected ? "text-blue-800" : "text-gray-800"
                  }`}
                >
                  {match.team2?.name}
                </h4>
                <p className="text-sm text-gray-600">{match.team2?.fullName}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <Mail className="h-3 w-3" />
                  <span>{match.team2?.email}</span>
                </div>
              </div>
              {isTeam2Winner && (
                <div className="ml-auto text-amber-600">
                  <Trophy className="h-6 w-6" />
                </div>
              )}
              {isTeam2Selected && !isTeam2Winner && (
                <div className="ml-auto text-blue-600">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              )}
            </div>
          </div>

          {/* Match summary */}
          {isCompleted && winner && (
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-gray-700">
                <span className="font-bold text-blue-600">{winner.name}</span>{" "}
                won this {match.round.toLowerCase()} match
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
          {(winnerState === match.team1Id || winnerState === match.team2Id) && (
            <button
              onClick={() => handleWinner(winnerState, match.id)}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
            >
              Confirm Winner
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;
