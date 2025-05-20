import React, { useEffect, useState } from "react";
import { ConnectionLinesProps, ConnectionProps } from "./types";

// This component renders a single connection line
const Connection: React.FC<ConnectionProps> = ({
  startX,
  startY,
  endX,
  endY,
  isHighlighted,
  matchId,
}) => {
  const midpointX = startX + (endX - startX) / 2;

  return (
    <path
      d={`M ${startX} ${startY} C ${midpointX} ${startY}, ${midpointX} ${endY}, ${endX} ${endY}`}
      stroke={isHighlighted ? "#3b82f6" : "#4b5563"}
      strokeWidth={isHighlighted ? 2 : 1.5}
      fill="none"
      strokeLinecap="round"
      className="transition-all duration-300 ease-in-out"
      data-match-id={matchId}
    />
  );
};

// This component calculates and renders all connection lines
const ConnectionLines: React.FC<ConnectionLinesProps> = ({
  tournament,
  highlightedMatchId,
}) => {
  const [connections, setConnections] = useState<React.ReactNode[]>([]);

  // Calculate connection positions based on DOM elements
  useEffect(() => {
    const calculateConnections = () => {
      const newConnections: React.ReactNode[] = [];

      // For each round except the last
      tournament.rounds.forEach((round, roundIndex) => {
        if (roundIndex === tournament.rounds.length - 1) return;

        // For each match in the current round
        round.matches.forEach((match) => {
          if (!match.nextMatchId) return;

          const currentMatchElement = document.querySelector(
            `[data-match-id="${match.id}"]`
          );
          const nextMatchElement = document.querySelector(
            `[data-match-id="${match.nextMatchId}"]`
          );

          if (currentMatchElement && nextMatchElement) {
            const currentRect = currentMatchElement.getBoundingClientRect();
            const nextRect = nextMatchElement.getBoundingClientRect();

            // Convert to coordinates relative to the SVG
            const svgElement = document.getElementById("connection-svg");
            if (!svgElement) return;

            const svgRect = svgElement.getBoundingClientRect();

            const startX = currentRect.right - svgRect.left;
            const startY =
              currentRect.top + currentRect.height / 2 - svgRect.top;
            const endX = nextRect.left - svgRect.left;
            const endY = nextRect.top + nextRect.height / 2 - svgRect.top;

            // Check if this connection is related to the highlighted match
            const isHighlighted =
              highlightedMatchId === match.id ||
              highlightedMatchId === match.nextMatchId;

            newConnections.push(
              <Connection
                key={`${match.id}-${match.nextMatchId}`}
                startX={startX}
                startY={startY}
                endX={endX}
                endY={endY}
                isHighlighted={isHighlighted}
                matchId={match.id}
              />
            );
          }
        });
      });

      setConnections(newConnections);
    };

    // Calculate immediately and then on window resize
    calculateConnections();

    const resizeObserver = new ResizeObserver(() => {
      calculateConnections();
    });

    resizeObserver.observe(document.body);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
    };
  }, [tournament, highlightedMatchId]);

  return (
    <svg
      id="connection-svg"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "visible" }}
    >
      {connections}
    </svg>
  );
};

export default ConnectionLines;
