import React, { useState, useRef } from "react";
import { Match, TournamentBracketProps } from "../types/tournament";
import RoundColumn from "./RoundColumn";
import MatchDetails from "./MatchDetails";
import BracketConnections from "./BracketConnections";
import { Trophy } from "lucide-react";
import { useUpdateMatchWinnerMutation } from "../../../redux/apis/match/matchApi";

const TournamentBracket: React.FC<TournamentBracketProps> = ({
  data,
  admin,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [activeRound, setActiveRound] = useState<string | null>(null);
  const bracketRef = useRef<HTMLDivElement>(null);
  const [updateMatchWinner] = useUpdateMatchWinnerMutation();
  const [winner, setWinner] = useState<string | null>(null);
  const roundOrder = [
    "Round of 32",
    "Round of 16",
    "Quarterfinal",
    "Semifinal",
    "Final",
  ];

  const availableRounds = roundOrder.filter(
    (round) => data[round] && data[round].length > 0
  );

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
  };

  const handleCloseDetails = () => {
    setSelectedMatch(null);
  };

  const handleRoundClick = (round: string) => {
    setActiveRound(activeRound === round ? null : round);
  };

  const findTournamentWinner = () => {
    if (data["Final"] && data["Final"].length > 0) {
      const finalMatch = data["Final"][0];
      if (finalMatch.winnerId) {
        const winner =
          finalMatch.team1Id === finalMatch.winnerId
            ? finalMatch.team1
            : finalMatch.team2;
        return winner;
      }
    }
    return null;
  };

  const tournamentWinner = findTournamentWinner();

  // Later in your code
  const handleUpdateWinner = async (winnerId: string, matchId: string) => {
    try {
      const result = await updateMatchWinner({ matchId, winnerId });

      if ("errorMessages" in result.data!) {
        // Handle error case
        console.error(result.data.message);
      } else {
        // Handle success case
        console.log("Match updated:", result?.data?.data);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Failed to update match:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700 mb-4">
        <h2 className="text-xl font-bold text-gray-100">Tournament Bracket</h2>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          {availableRounds.map((round) => (
            <button
              key={round}
              onClick={() => handleRoundClick(round)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                activeRound === round
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {round}
            </button>
          ))}
          {activeRound && (
            <button
              onClick={() => setActiveRound(null)}
              className="px-3 py-1 text-sm rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Show All
            </button>
          )}
        </div>
      </div>

      {tournamentWinner && (
        <div className="bg-gradient-to-r from-amber-700 to-amber-600 p-4 rounded-lg shadow-lg border border-amber-500 mb-4">
          <div className="flex items-center justify-center gap-2 text-amber-100">
            <Trophy className="h-6 w-6" />
            <h3 className="text-lg font-bold">Tournament Champion</h3>
          </div>
          <p className="text-xl font-bold mt-2 text-center text-white">
            {tournamentWinner.name}
          </p>
          <p className="text-sm text-center text-amber-200">
            {tournamentWinner.fullName}
          </p>
        </div>
      )}

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-8 min-w-max relative" ref={bracketRef}>
          <BracketConnections data={data} containerRef={bracketRef} />
          {availableRounds
            .filter((round) => !activeRound || round === activeRound)
            .map((round) => (
              <RoundColumn
                key={round}
                round={round}
                matches={data[round]}
                onMatchClick={handleMatchClick}
              />
            ))}
        </div>
      </div>

      {admin && selectedMatch && (
        <MatchDetails
          winnerState={winner || ""}
          handleWinner={handleUpdateWinner}
          match={selectedMatch}
          onClose={handleCloseDetails}
          setWinner={setWinner}
        />
      )}
    </div>
  );
};

export default TournamentBracket;
