import React from "react";
import { Match, TournamentData } from "../types/tournament";

interface BracketConnectionsProps {
  data: TournamentData;
  containerRef: React.RefObject<HTMLDivElement>;
}

const BracketConnections: React.FC<BracketConnectionsProps> = ({
  data,
  containerRef,
}) => {
  const [paths, setPaths] = React.useState<
    Array<{ start: DOMRect; end: DOMRect }>
  >([]);

  React.useEffect(() => {
    const updatePaths = () => {
      if (!containerRef.current) return;

      const newPaths: Array<{ start: DOMRect; end: DOMRect }> = [];
      const rounds = ["Round of 16", "Quarterfinal", "Semifinal", "Final"];

      for (let i = 0; i < rounds.length - 1; i++) {
        const currentRound = rounds[i];
        const nextRound = rounds[i + 1];

        if (!data[currentRound] || !data[nextRound]) continue;

        data[currentRound].forEach((match: Match) => {
          if (match.winnerId) {
            const nextMatch = data[nextRound].find(
              (m: Match) =>
                m.team1Id === match.winnerId || m.team2Id === match.winnerId
            );

            if (nextMatch) {
              const currentMatchElement = document.getElementById(
                `match-${match.id}`
              );
              const nextMatchElement = document.getElementById(
                `match-${nextMatch.id}`
              );

              if (currentMatchElement && nextMatchElement) {
                const startRect = currentMatchElement.getBoundingClientRect();
                const endRect = nextMatchElement.getBoundingClientRect();
                const containerRect =
                  containerRef?.current?.getBoundingClientRect();

                if (containerRect) {
                  const adjustedStart = {
                    ...startRect,
                    x: startRect.x - containerRect.x,
                    y: startRect.y - containerRect.y,
                  };
                  const adjustedEnd = {
                    ...endRect,
                    x: endRect.x - containerRect.x,
                    y: endRect.y - containerRect.y,
                  };

                  newPaths.push({
                    start: adjustedStart,
                    end: adjustedEnd,
                  });
                }
              }
            }
          }
        });
      }

      setPaths(newPaths);
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);

    return () => {
      window.removeEventListener("resize", updatePaths);
    };
  }, [data, containerRef]);

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#475569"
            className="transition-colors duration-200"
          />
        </marker>
      </defs>
      {paths.map((path, index) => {
        const startX = path.start.x + path.start.width;
        const startY = path.start.y + path.start.height / 2;
        const endX = path.end.x;
        const endY = path.end.y + path.end.height / 2;
        const controlPointX = (endX - startX) / 2 + startX;

        return (
          <path
            key={index}
            d={`M ${startX} ${startY} 
                C ${controlPointX} ${startY}, 
                  ${controlPointX} ${endY}, 
                  ${endX} ${endY}`}
            fill="none"
            stroke="#475569"
            strokeWidth="2"
            className="transition-colors duration-200"
            markerEnd="url(#arrowhead)"
          />
        );
      })}
    </svg>
  );
};

export default BracketConnections;
