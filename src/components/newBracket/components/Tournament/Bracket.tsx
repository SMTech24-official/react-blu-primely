/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import Round from "./Round";
import ConnectionLines from "./ConnectionLine";
import { BracketProps } from "./types";

const Bracket: React.FC<BracketProps> = ({ tournament, onMatchClick }) => {
  const [highlightedMatchId, setHighlightedMatchId] = useState<string | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    // Mobile view - vertical scrolling through rounds
    return (
      <div className="bracket-container w-full overflow-x-auto bg-gray-900 text-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {tournament.name}
        </h2>
        <div className="space-y-8">
          {tournament.rounds.map((round, _index) => (
            <div key={round.id} className="round-section">
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">
                {round.name}
              </h3>
              <div className="space-y-4">
                {round.matches.map((match, _matchIndex) => (
                  <div
                    key={match.id}
                    className="bg-gray-800 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => onMatchClick && onMatchClick(match.id)}
                  >
                    <div className="flex flex-col gap-2">
                      <div
                        className={`p-2 rounded flex justify-between items-center ${
                          match.winner === match.teams[0]?.id
                            ? "bg-blue-900 bg-opacity-30"
                            : "bg-gray-700"
                        }`}
                      >
                        <span>{match.teams[0]?.name || "TBD"}</span>
                        {match.teams[0]?.score !== undefined && (
                          <span className="font-bold">
                            {match.teams[0].score}
                          </span>
                        )}
                      </div>
                      <div
                        className={`p-2 rounded flex justify-between items-center ${
                          match.winner === match.teams[1]?.id
                            ? "bg-blue-900 bg-opacity-30"
                            : "bg-gray-700"
                        }`}
                      >
                        <span>{match.teams[1]?.name || "TBD"}</span>
                        {match.teams[1]?.score !== undefined && (
                          <span className="font-bold">
                            {match.teams[1].score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Desktop view - horizontal bracket layout
  return (
    <div className="bracket-container relative w-full overflow-x-auto bg-gray-900 text-white p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{tournament.name}</h2>
      <div className="bracket relative flex min-w-max">
        {tournament.rounds.map((round, roundIndex) => (
          <Round
            key={round.id}
            round={round}
            roundIndex={roundIndex}
            highlightedMatchId={highlightedMatchId}
            setHighlightedMatchId={setHighlightedMatchId}
            onMatchClick={onMatchClick}
          />
        ))}
        <ConnectionLines
          tournament={tournament}
          highlightedMatchId={highlightedMatchId}
        />
      </div>
    </div>
  );
};

export default Bracket;
